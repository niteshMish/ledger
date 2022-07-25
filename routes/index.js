const express = require('express');
const router = express.Router();


const ledgerController = require('../controller/main_controller');
// router.get('/sign-in',userController.signIn);
// router.get('/sign-up',userController.signUp);
// router.post('/create' , userController.create);
// router.post('/create-session' , userController.createSession);
// router.post('/add-habit',userController.addHabit);
router.get('/', ledgerController.home);
router.get('/balance/:bank_name/:borrower_name/:EMI_no',ledgerController.getBalance);
router.get('/loan/:bank_name/:borrower_name/:principal_amt/:time/:rate', ledgerController.findLone );
router.get('/payment/:bank_name/:borrower_name/:lumb_sum_amt/:EMI_no' ,ledgerController.getPayment);
module.exports = router;