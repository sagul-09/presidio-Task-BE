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
    res.send(
      "Welcome to Movie API <br>" +
      "/api/movie/all - Get all movies <br>" +
      "/api/movie/add - Add a movie <br>" +
      "/api/movie/:id - Get a movie by id <br>" +
      "/api/movie/:id - Update a movie by id <br>" +
      "/api/movie/:id - Delete a movie by id <br>" +
      "/api/movie/search - Search a movie <br>" +
      "/api/movie/filter - Filter movies by genre <br>" +
      "/api/movie/language - Get the count of movies by language"
    );
});
const db = mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("DB is connected"); 
}).catch((err)=>{
    console.log(err);
})
app.use("/api/movie",movieRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});

