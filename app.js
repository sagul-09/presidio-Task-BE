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

const db = mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("DB is connected"); 
}).catch((err)=>{
    console.log(err);
})
app.use("/api/movie",movieRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});

