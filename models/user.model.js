import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'User name is required'],
        trim:true,
        minLength:3,
        maxLength:50,
    },
    email:{
        type:String,
        required:[true,'User email is required'],
        unique:true,
        trim:true,
        lowerCase:true,
        match:[/\S+@\S+\.\S/,'please fill a vaalid email address'],},
    password:{
        type:String,
        required:true,

        minLength:3,
    }
},
{timestamps:true});

const User=mongoose.model('User', userSchema);

export default User;