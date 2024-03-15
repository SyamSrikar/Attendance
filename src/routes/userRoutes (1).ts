import express from 'express';
import { validation } from '../validator';
import { createDocument } from '../service/Details';
import { generateAuthToken } from '../service/Details';
import Details from '../models/Details';
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require('cors');

const app=express();
app.use(cors());
app.use(cookieParser())
app.use(bodyParser.json());

app.post('/login', async(req, res) => {
    const {id,password}=req.body
    const status = await validation({id,password})
    if (status){
        const token= await generateAuthToken(status)
        res.cookie("jwt",status.tokens[status.tokens.length-1],{expires:new Date(Date.now()+60000),httpOnly:true})
        console.log(status)
        res.status(200).json({success: true,details:status,token:token });
    }
    else{
        console.log('error')
        res.status(400).json({ success: false, details: 'Invalid username or password' });
    }
})

app.get('/verifytoken',async(req,res)=>{
    const header=req.headers
    const verify=jwt.verify(header.authorisation,'hellowelcometobackendwithnodejwt')
    if (verify)
    {   
        const result= await Details.find({_id:verify._id})
        res.status(200).json({success: true,details:result});
    }
})

app.post('/studentslist',async(req,res)=>{
    const list =await Details.find({type:'User'},{_id:0,userId:1,name:1})
    console.log(list)
    if(list){
        res.status(200).json({success:true,details:list})
    }
})

app.post('/postattendance',async(req,res)=>{
    const ids=req.body.selected; 
    console.log(req.body.date)
    for(var i=0;i<ids.length;i++){
        const userDate=await Details.find({userId:ids[i]},{_id:0,dates:1})
        userDate[0].dates.push(req.body.date)
        console.log(userDate)
        const result = await Details.updateOne({userId:ids[i]},{$set:{dates:userDate[0].dates}})
        if (!result){
            res.status(400).json({ success: false, details: 'id not found' });
        }
    }
    res.status(200).json({success:true})
    }
)


app.post('/getattendance',async(req,res)=>{
    const userId=req.body.id
    console.log(userId)
    const date =await Details.find({userId:userId},{_id:0,dates:1})
    console.log(date)
    if (date){
        res.status(200).json({success:true,data:date[0].dates})
    }

})


app.listen(3000,()=>{
    console.log('listening')
})

export default app;