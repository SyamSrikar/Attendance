import mongoose from 'mongoose';
const jwt=require('jsonwebtoken')

const detailSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    type:{
        type:String,
        enum:["User","Admin"],
        required:true
    },
    userId:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    dates:{
        type:Array,
    },
    tokens:{
        type:[String],
    }
})



const Details = mongoose.model("Details",detailSchema)


export default Details;