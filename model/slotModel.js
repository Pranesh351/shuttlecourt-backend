const mongoose= require('mongoose');
const schema= mongoose.Schema;

const slotSchema= new schema({
    email:{type:String, required:true},
    startTime:{type:String, required:true},
    duration:{type:Number, required:true},
    court:{type:Number, required:true},
    person:{type:Number, required:true},
    cost:{type:Number, required:true},
    availedFreeHrs:{type:Number, required:true}
},{timestamps:true});

module.exports = mongoose.model("slot", slotSchema);