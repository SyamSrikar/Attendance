import express from 'express';
import bodyParser from 'body-parser';
const app=express();

import userRoutes from './routes/userRoutes';

import { createDocument } from './service/Details'; 

import mongoose from 'mongoose';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
mongoose.connect("mongodb://0.0.0.0:27017/attendance")
.then(()=>{
    console.log("conection successful");
    app.use('/user',userRoutes)
    app.listen(8080);
}).catch((err: any)=>console.log(err)) ;   



