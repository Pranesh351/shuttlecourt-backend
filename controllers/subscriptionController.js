const mongoose= require('mongoose');
const subscription= require('../model/subscriptionModel');

//Post
const createSubscription=async(req, res)=>{
    
    const {name, discription, price, startTime, days, duration, offer}= req.body;
    const {email}= req.user;
    const emptyField= [];
    if(!name){emptyField.push("name");}
    if(!discription){emptyField.push("discription");}
    if(!price){emptyField.push("price");}
    if(!startTime){emptyField.push("startTime");}
    if(!duration){emptyField.push("duration");}

    if(emptyField.length>0){
        res.status(400).json({error: err});
    }

    try{
        const response= await subscription.create({email, name, discription, price, startTime, days, duration, offer});
        res.status(200).json(response);
    }catch(err){
        res.status(400).json({error: err.message});
    }
};

//Get all
const mySubscriptions=async(req,res)=>{
    const {email}= req.user;
    const response= await subscription.find({email:email});
    res.status(200).json(response);
};

//Get one
const specificSubscription=async(req, res)=>{
    const {email}= req.user;
    const _id= new mongoose.Types.ObjectId(req.params.id);
    try{
        mongoose.isValidObjectId(_id);
    }catch(err){
        res.status(400).json({error: err});
    }
    const response= await subscription.findOne({email:email, _id:_id});
    res.status(200).json(response);
};

//Update
const updateSubcription=async(req, res)=>{
    const {email}= req.user;
    const _id= new mongoose.Types.ObjectId(req.params.id);
    try{
        mongoose.isValidObjectId(_id);
    }catch(err){
        res.status(400).json({error: err});
    }
    const response= await subscription.findOneAndUpdate({email:email, _id:_id},{...req.body});
    await res.status(200).json(response);
};

//Delete
const deleteSubscription=async(req, res)=>{
    const {email}= req.user;
    const _id= new mongoose.Types.ObjectId(req.params.id);
    try{
        mongoose.isValidObjectId(_id);
    }catch(err){
        res.status(400).json({error: err});
    }
    const response= await subscription.findOneAndDelete({email:email, _id:_id});
    res.status(200).json(response);
};

module.exports= {createSubscription, mySubscriptions, specificSubscription, updateSubcription, deleteSubscription};