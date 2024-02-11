const express = require('express');
const router = express.Router()
const register=require('../controllers/register')
const varifyEmail=require('../controllers/varifyEmail')
const sendMobileOtp=require('../controllers/sendMobileOtp');
const sendEmail=require('../controllers/sendEmail')
const varifyMobile=require('../controllers/varifyMobile')
const {protect}= require('../middleware/protect')

router.post('/signup',register)

router.post('/sendemail',protect,sendEmail)

router.post('/varifyemail',protect,varifyEmail)
router.post('/varifymobile',protect,varifyMobile)
router.post('/sendmobile',protect,sendMobileOtp)
module.exports = router;