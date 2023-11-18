import mongoose from mongoose
const movieSchema= new mongoose.Schemea({
    moveiName:{
        type: String,
        required: true,
        unique: true,
        index:true
    },
    movieYear:{
        required:true,
        unique:false,
        index:true
    },
    movieGenre1 : {
        type : String,
        enum: ['Action', 'Comedy','Drama','SciFi','Horror','Thriller','Romance','Fantasy','Animation','Adventure','Crime', 'Biography'],
        required : true
    },
    movieGenre2 : {
        type : String,
        enum: ['Action', 'Comedy','Drama','SciFi','Horror','Thriller','Romance','Fantasy','Animation','Adventure','Crime', 'Biography'],
        required : true
    },
    imdb:{
        type: Number,
        required:true,
        unique: false,
        min:0,
        max:10
    }
})