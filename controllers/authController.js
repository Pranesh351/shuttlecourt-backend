const mongoose= require('mongoose');
const user= require('../model/userModel');

//Post
const signup= async(req, res)=>{
    const {email, password}= req.body;
    try{
        const response= await user.signup(email, password);
        res.status(200).json(response);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

//Post
const signin= async(req, res)=>{
    const {email, password}= req.body;
    try{
        const response= await user.login(email, password);
        res.status(200).json(response);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

//update
const resetPassword= async(req, res)=>{
    const {email, password}= req.body;
    try{
        const response= await user.resetPassword(email, password);
        res.status(200).json("Your password successfully changed");
    }catch(err){
        res.status(400).json({error:err.message});
    }
};

module.exports={signup, signin, resetPassword};