const mongoose=require('mongoose');
const user= require('../model/userModel');
const jwt= require('jsonwebtoken');

const requireAuth= async(req, res, next)=>{
    //verify token
    const {authorization}= req.headers;

    if(!authorization){
        res.status(404).json({error:'Authorization token required'})
    }

    const token= authorization.split(' ')[1]
    try{
        const {_id}=jwt.verify(token, process.env.SECRET);
        const id= new mongoose.Types.ObjectId(_id);
        req.user=await user.findOne({_id:id}).select(["_id", "email"])
        next();
    }catch{
        res.status(404).json({error:'Request is not authorized'})
    }
}

module.exports = requireAuth