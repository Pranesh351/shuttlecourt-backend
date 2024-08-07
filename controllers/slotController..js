const mongoose= require('mongoose');
const slot= require('../model/slotModel');

//Post
const createSlot= async(req, res)=>{
    const {startTime, duration, court, person, cost, availedFreeHrs}=req.body;
    const {email}= req.user;
    const emptyField= [];
    if(!email){emptyField.push('email');}
    if(!startTime){emptyField.push('startTime');}
    if(!duration){emptyField.push('duration');}
    if(!court){emptyField.push('slot');}
    if(!person){emptyField.push('person');}
    
    if(emptyField.length>0){
        res.status(400).json(emptyField);
    }

    try{
        const response= await slot.create({email, startTime, duration, court, person, cost, availedFreeHrs});
        res.status(200).json(response);
    }catch(err){
        res.status(400).json({error: err.message});
    }
    
};

//Get all
const mySlots= async(req, res)=>{
    const response= await slot.find().sort({createdAt: -1});
    res.status(200).json(response);
};

//Get one
const specificSlot= async(req, res)=>{
    const {email}= req.user;
    const _id= new mongoose.Types.ObjectId(req.params.id);
    try{
        mongoose.isValidObjectId(_id);
    }catch(err){
        res.status(400).json({error: err.message});
    }
    const response= await slot.findOne({email:email, _id:_id});
    res.status(200).json(response);
};

//update
const updateSlot= async(req, res)=>{
    const {email}= req.user;
    const _id= new mongoose.Types.ObjectId(req.params.id);
    try{
        mongoose.isValidObjectId(_id);
    }catch(err){
        res.status(400).json({error:err.message});
    }
    const response= await slot.findOneAndUpdate({email:email, _id:_id},{...req.body});
    res.status(200).json(response);
};

//Delete
const deleteSlot= async(req, res)=>{
    const _id= new mongoose.Types.ObjectId(req.params.id);
    try{
        mongoose.isValidObjectId(_id);
    }catch(err){
        res.status(400).json({error:err.message});
    }
    const response= await slot.deleteOne({_id:_id});
    res.status(200).json(response);
};

module.exports= {createSlot, mySlots, specificSlot, updateSlot, deleteSlot};