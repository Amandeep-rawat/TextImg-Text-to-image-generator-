import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import Razorpay from "razorpay"
import Transaction from "../models/transactionModel.js";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
    // console.log("Restrrigng..")
    try {
        // const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Please fill all the fields" });

        }
        // //check email pattern matches orn ot 
        // if(!emailPattern.test(email)){
        //     return res.status(400).json({error:"Please use a valid email format"});
        // }
        //check if user already exists
        const alreadyExists = await User.findOne({ email });
        if (alreadyExists) {
            return res.status(400).json({ message: "user already register... you have to log in now ... go to log in page " })
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = {
            name: username, email, password: hashedPassword
        }
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
        res.json({ success: true, token, user: { name: savedUser.name, email: savedUser.email, creditBalance: savedUser.creditBalance } });
    } catch (error) {
        return res.status(400).json({ message: "Something went wrong", error: error.message, success: false });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found", success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "password does not matched !" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ message: "Logged in successfully", success: true, token, user: { name: user.name, email: user.email, creditBalance: user.creditBalance } });

    } catch (error) {

    }
}


export const userCredits = async (req, res) => {
    try {
        const userId = req.body.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "User not found", success: false });
        }
        res.json({ success: true, credits: user.creditBalance, user: { name: user.name, email: user.email, creditBalance: user.creditBalance } });

    } catch (error) {
        return res.status(400).json({ message: "Something went wrong", error: error.message, success: false });
    }

}
// razorpay setup
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
export const paymentRazorpay = async (req, res) => {
    try {
        const { userId, planId } = req.body;
        if (!userId || !planId) {
            return res.status(400).json({ message: "Missing details", success: false });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }
        let credits, plan, amount, date;
        const conversionRate = 82.5; // USD to INR conversion ra
        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 10;
                amount = (1 * conversionRate).toFixed(2); // Convert 1 USD to INR
                date = new Date(Date.now() + 24 * 60 * 60 * 1000);
                break;
            case 'Advanced':
                plan = 'Advanced'
                credits = 20;
                amount = (2 * conversionRate).toFixed(2); // Convert 1 USD to INR
                date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                break;
            case "Business":
                plan = 'Business'
                credits = 35;
                amount = (3 * conversionRate).toFixed(2); // Convert 1 USD to INR
                date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                break;
            default:
                return res.status(400).json({ message: "Invalid plan id", success: false });

        }
        const transactionData = {
            userId: userId, plan: plan, amount: amount, credits: credits, date: date
        }

        const newTransaction = await Transaction.create(transactionData);
        const options={
            amount: Math.round(amount * 100), 
            currency:process.env.CURRENCY,
            receipt:`${newTransaction._id}`,
        }
        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                return res.status(400).json({ message: "Something went wrong", error: error.message, success: false });
            }
            res.json({ message: "Order created successfully", success: true, order });
        })

    } catch (error) {
        console.log('error',error.message);
        res.json({ message: "Something went wrong", error: error.message, success: false });
    }
}

export const verifyRazorpay = async (req, res) => {
    // console.log("Verification started");
    try {
        const {razorpay_order_id,razorpay_payment_id} = req.body;
        // console.log('Razorpay ID:', razorpay_payment_id);

        if (!razorpay_payment_id) {
            return res.status(400).json({ message: 'Payment ID is required', success: false });
        }

        let orderInfo;
        
        // Fetch order details
        try {
            orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
            // console.log('Order Info:', orderInfo);
        } catch (error) {
            console.log("Error fetching order:", error.message);
            if (error.statusCode === 404) {
                    console.log("404");
                    
                } else if (error.statusCode === 400) {
                    console.log("400");
                } else {
                console.log("other");
            }
            return res.status(400).json({ message: "Invalid Payment ID", success: false });
        }

        if (!orderInfo) {
            return res.status(404).json({ message: 'Order not found', success: false });
        }

        if (orderInfo.status === 'paid') {
            const transactionData = await Transaction.findById(orderInfo.receipt);
            // console.log('Transaction Data:', transactionData);

            if (transactionData && transactionData.payment) {
                return res.json({ success: false, message: 'Payment already verified' });
            }

            const userData = await User.findById(transactionData.userId);
            // console.log('User Data:', userData);

            const creditBalance = userData.creditBalance + transactionData.credits;
            await User.findByIdAndUpdate(userData._id, { creditBalance });
            await Transaction.findByIdAndUpdate(transactionData._id, { payment: true });

            res.json({ success: true, message: "Credit purchased and added successfully." });
        } else {
            res.json({ success: false, message: 'Payment failed' });
        }

    } catch (error) {
        console.log("Error:", error.message);
        return res.status(400).json({ message: error.message, success: false });
    }
};
