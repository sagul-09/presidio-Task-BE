import express  from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import movieRoute from "./routes/movieRoute.js";
dotenv.config();

const PORT=4000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to the Movie API Server <br><br> /api/v1/movie <br> /api/v1/movie/add <br> /api/v1/movie/search <br> /api/v1/movie/filter <br> /api/v1/movie/language <br> /api/v1/movie/delete/:id <br> /api/v1/movie/get/:id <br> /api/v1/movie/update/:id");});
const db = mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("DB is connected"); 
}).catch((err)=>{
    console.log(err);
})
app.use("/api/v1/movie",movieRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});

