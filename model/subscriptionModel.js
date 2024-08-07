const mongoose= require('mongoose');
const schema=mongoose.Schema;

const subscriptionSchema=new schema({
    email:{type:String, required:true},
    name:{type:String, required:true},
    discription:{type:String, required:true},
    price:{type:Number, require:true},
    startTime:{type:String, required:true},
    days:{type:Number, required:true},
    duration:{type:Number, required:true},
    offer:{type:Number, required:true}
},{timestamps:true});

module.exports= mongoose.model("subcription", subscriptionSchema);