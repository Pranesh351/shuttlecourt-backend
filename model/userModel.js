const bcrypt= require('bcrypt');
const validator= require('validator');
const jwt= require ('jsonwebtoken');

const mongoose= require("mongoose");
const schema= mongoose.Schema;

//create token
const createToken= (_id)=>{return jwt.sign({_id}, process.env.SECRET,{expiresIn:'3d'})};

const userSchema= new schema({
    email:{type:String, required:true},
    password:{type:String, required:true}
},{timestamps:true});

//Sign-Up
userSchema.statics.signup = async function(email, password){
    if(!email||!password){
        throw Error("All fields should be filled");
    }
    const exist= await this.findOne({email});
    if(exist){
        throw Error("Email already exist. Please provide another email");
    }
    if(!validator.isEmail(email)){
        throw Error("Please provide valid Email");
    }
    if(password && !validator.isStrongPassword(password)){
        throw Error("Password is not strong enough");
    }

    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password, salt);
    const user=await this.create({email, password:hash});
    const token= createToken(user._id);
    return {email, token};
};

//sign-in
userSchema.statics.login = async function(email, password){
    if(!email){
        throw Error("Email is required");
    }

    const exist=await this.findOne({email});
    if(!exist){
        throw Error("Email-ID not found");
    }

    const match=await bcrypt.compare(password, exist.password);
    if(!match){
        throw Error("Incorrect Password");
    }

    const token= createToken(exist._id);
    return {email, token};
};

//forget password
userSchema.statics.resetPassword = async function(email, password){
    if(!email||!password){
        throw Error("All fields are required");
    }

    const exist=await this.findOne({email});
    if(!exist){
        throw Error("Email-ID not found");
    }
    if(password && !validator.isStrongPassword(password)){
        throw Error("Password is not strong enough");
    }

    const id= new mongoose.Types.ObjectId(exist._id);
    const salt= await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(password, salt);
    const user= await this.findByIdAndUpdate({_id: id},{password:hash});
    if(!user){
        throw Error("Invalid update please try again");
    }
    return true;
};

module.exports= mongoose.model("user", userSchema);