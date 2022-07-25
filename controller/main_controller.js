const Lone = require('../model/lone');

const Payment = require('../model/payment');

module.exports.home = function(req , res){
    return  res.status(200).json({
        message:'check home' 
     });
 };
module.exports.findLone = async function(req , res){

 let principal = parseInt( req.params.principal_amt);
 
 let rate = parseInt( req.params.rate);
 let time  = parseInt( req.params.time); 
 
     let amt  = principal+(principal*rate*time)/100;
     console.log(amt);
 let emi =  Math.ceil( amt/(time*12));   
 
 let lone = await Lone.create({
     bank_name:req.params.bank_name,
     borrower_name:req.params.borrower_name,
     rate:rate,
     principal_amt:principal,
     time:time,
     total_amt:amt,
     EMI_amt:emi
  });
  if(lone){

    return  res.status(200).json({
         message:'lone ledger created successfully',
         lone_details:lone
     });

  }else{

    return  res.status(500).json({
        message:'some thing goes worng',
       
     });
   }
};
module.exports.getBalance = async  function(req , res){
   let Paid_amt = 0 ;
   let remaning_EMI_count = 0; 
   let status  =  await Lone.find({
    bank_name:req.params.bank_name,
    borrower_name:req.params.borrower_name
   }) ; 
   if( status.length > 0){
    console.log("status" , status);
    let EMI_amt =  parseInt( status[0].EMI_amt);
    console.log("line no 52" , status[0].EMI_amt);
    console.log("line no 53 EMI_amt" , EMI_amt , typeof(EMI_amt));
    let total_amt = parseInt( status[0].total_amt); 
    console.log("line no 55 paid_amt" , total_amt , typeof(total_amt));
    console.log("line no 56 paid_amt" , Paid_amt);
    console.log(" status",status);
     let payments =  await Payment.find({
        bank_name:req.params.bank_name,
        borrower_name:req.params.borrower_name,
        EMI_no:{$lt : req.params.EMI_no+1}
    }) ; 
        if(payments){
          payments.forEach(payment => {
            console.log("lubm_sum_value" , payment.lumb_sum_amt);
            Paid_amt +=  parseInt( payment.lumb_sum_amt );
          });
        }
        console.log("Paid_amt , first" , Paid_amt);
        Paid_amt = Paid_amt +  req.params.EMI_no * EMI_amt; 
        remaning_EMI_count =Math.ceil( (total_amt - Paid_amt)/EMI_amt);

         console.log("paid_amt second"  , Paid_amt);
    

    return  res.status(200).json({
        message:'balance' ,
        amt :Paid_amt,
        remaning_EMI_count:remaning_EMI_count
    });
};
return  res.status(500).json({
    message:' data not persent ' ,
    
});
}
module.exports.getPayment = async function(req , res){
    let payment = await Payment.create({
        bank_name:req.params.bank_name,
        borrower_name:req.params.borrower_name,
        lumb_sum_amt:req.params.lumb_sum_amt,
        EMI_no:req.params.EMI_no
     });
     if(payment){
        return  res.status(200).json({
            message:'payment done', 
            data:payment
         });
     }
     return  res.status(500).json({
        message:'Error', 
       
     });
   
};
