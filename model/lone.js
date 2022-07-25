const mongoose = require('mongoose');

const loneSchema = new mongoose.Schema({
     bank_name:{
        type:String,
        required:true
     },
     borrower_name:{
        type:String,
        required:true
     },
     principal_amt:{
        type:Number,
        required:true
     },
     time:{
        type:Number,
        required:true
     },
     rate:{
        type:Number,
        required:true
     },
     EMI_amt:{
      type:Number,
      required:true
     },
     total_amt:{
      type:Number,
      required:true
   }

},{timestamps:true});
const Lone = mongoose.model('Lone',loneSchema);
module.exports = Lone;