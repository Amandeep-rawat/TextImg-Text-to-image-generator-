import { assets, plans } from '@/assets/assets';
import { AppContext } from '@/context/AppContext';
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Check } from 'lucide-react';
// import Razorpay from 'razorpay';
const BuyCredit = () => {
  const { user, loadCreditData, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const initPay = async (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: 'Credit payments',
      order_id: order.id,
      reciept: order.reciept,
      handler: async (response) => {

        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/verify-razor`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "token": token
            },
            body: JSON.stringify(response),
          })

          const data = await res.json()
          if (data.success) {
            loadCreditData();
            navigate('/');
            toast.success('Credit Added');

          }
          else {
            toast.error(data.message);
          }



        } catch (error) {
          toast.error(error.message)
        }

      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const paymentRazorPay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/pay-razor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify({ planId })
      })
      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message);
        return;
      }
      const data = await res.json();
      if (data.success) {
        initPay(data.order);
      }

    } catch (error) {
      toast.error(error.message);
    }

  }
  return (
    <motion.div

      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}

      className=' min-h-[80vh] flex  flex-col my-10 gap-4 items-center justify-center   w-full'>
      <button className='bg-gradient-to-tr from-[#8360a1] to-[#3a3586] border border-gray-400 px-4 py-2 text-sm rounded-full text-white'>OUR PLANS</button>
      <h1 className='text-3xl font-semibold bg-gradient-to-br from-[#8360a1] to-[#3a3586] text-transparent bg-clip-text' >Choose the plan</h1>
      <div className='w-full 2xl:max-w-6xl  flex items-center max-lg:flex-wrap  justify-center gap-4'>
        {
          plans.map((item, index) => {
            return (
              <div className='bg-gradient-to-bl  w-1/3 max-lg:w-[95%] transition-all duration-500 hover:scale-[1.05] from-[#e94bde] to-[#7108a6]  px-1 py-1 rounded-lg text-sm '>

                <div className='bg-white  border lg:w-full rounded-lg     pt-12 pb-3 px-2 flex flex-col  border-teal-50 shadow-md' key={item.id}>
                  <img src={assets.logo} width={40} alt="" className='mb-2' />
                  <h2 className='text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#b73076] to-[#342bb0] font-semibold '>{item.id} Plan</h2>
                  <div className='flex items-center gap-2 mb-2'>
                    <h2 className='text-2xl font-semibold'>{`$${item.price}`}</h2>
                    <p className='text-gray-600 mt-1 text-sm'>/{item.credits} credits </p>
                  </div>
                  <p className='mb-2'>{item.desc}</p>
                  <div className='flex flex-col justify-center gap-y-1 mb-2 '>
                    {
                      item.points.map((point, index) => {
                        return (
                          <div className='flex  items-center gap-2' key={index}>
                            <div className='rounded-full p-0.5 bg-gradient-to-br from-[#c557cf] to-[#4e0b81] w-fit'>

                              <Check size={15} className='bg-black/80 text-purple-300 p-0.9 rounded-full   ' />

                            </div>
                            <p>{point}</p>

                          </div>
                        )
                      }
          )}
                
              </div>
                  <button onClick={() => { 
                    alert('teri maa ki chuut ?...')
                    // paymentRazorPay(item.id)
                   }} className='bg-zinc-900 text-white  px-4 py-2 2xl:px-10 2xl:py-4 text-sm rounded-md'>
                    {
                      user ? "Purchase" : "Get Started"
                    }
                  </button>


                </div>
              </div>
            )
          })
        }
      </div>

    </motion.div>
  );
}

export default BuyCredit;
