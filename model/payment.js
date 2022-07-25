
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
     bank_name:{
        type:String,
        required:true
     },
     borrower_name:{
        type:String,
        required:true
     },
     lumb_sum_amt:{
        type:Number,
        required:true
     },
     EMI_no:{
        type:Number,
        required:true
     },
    
},{timestamps:true});
const Payment = mongoose.model('Payment',paymentSchema);
module.exports = Payment;