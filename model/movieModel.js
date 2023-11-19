import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    imdb: {
        type: Number,
        required: true
    },  
},
    {
        timestamps: true,
    }

);

const movieSchema = mongoose.model("Movie", Schema);

export default movieSchema;

