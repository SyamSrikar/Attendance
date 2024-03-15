import express from 'express';
const app=express();
import userRoutes from './routes/userRoutes';
import mongoose from 'mongoose';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
mongoose.connect("mongodb://0.0.0.0:27017/attendance")
.then(()=>{
    console.log("conection successful");
    app.use('/',userRoutes)
    app.listen(3000);
}).catch((err: any)=>console.log(err)) ;   

