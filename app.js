require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import movieRoutes from "./routes/movieRoutes.js";
const PORT=6969;
const app=express();

mongoose.connect(process.env.DB_URL);
const db=mongoose.connection
db.on('error', (errorMessage)=>{
    console.log('cant connect to the mongoDB backend',errorMessage);
});
db.once('open',(success)=>{
    console.log('connection scccessfull with the mongoDB backend',success);
})

app.use(express.json());
app.use(cors());
app.use('/api/v1/movie',movieRoutes);

app.listin(PORT,()=>{
    console.log(`server is running in http://localhost:${PORT}/api/v1/movie`)
})


