import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({

userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
plan:{type:String,required:true},
amount:{type:Number,required:true},
date:{type:Date,required:true},
credits:{type:Number,required:true},
payment:{type:Boolean,required:true,default:false},


})

const Transaction=mongoose.model("Transaction",transactionSchema);
export default Transaction;