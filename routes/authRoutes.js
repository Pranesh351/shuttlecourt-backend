const {signup, signin, resetPassword}= require('../controllers/authController');

const express= require('express');
const router= express.Router();

//Sign Up Route
router.post('/signup', signup);

//Sign in Route
router.post('/signin',signin);

//Forget password Route
router.patch('/changepassword', resetPassword);

module.exports= router;