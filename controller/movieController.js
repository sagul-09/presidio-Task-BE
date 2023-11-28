import Movie from "../model/movieModel.js";

//get all movies from database
const allMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json({ movies : movies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add movie to database
const addMovie = async (req, res) => {
  try {
    if (!req.body.title || !req.body.director || !req.body.year || !req.body.language || !req.body.genre || !req.body.imdb) { 
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    const movieExists = await Movie.findOne({ title: req.body.title });
    if (movieExists) {
      return res.status(409).json({ message: "Movie already exists" });
    }
     const createdMovie = await Movie.create(req.body);
    res.status(201).json({ message: "Movie added successfully", movie: createdMovie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get movie by ID
const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.status(200).json({message: "Movie found", movie: movie});
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update movie by ID
const updateMovie = async (req, res) => {
  try {
    if (!req.body.title || !req.body.director || !req.body.year || !req.body.language || !req.body.genre || !req.body.imdb) { 
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    const movieExists = await Movie.findById(req.params.id);
    if (!movieExists) {
      return res.status(404).json({ message: "Movie not exists" });
    }
    await Movie.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
    });
    res.status(200).json({ message: "Movie updated successfully", movie: movieExists });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete movie by ID
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie removed successfully", movie: movie });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//movie filter by title, director, year, language, genre, imdb
const filterMovies = async (req, res) => {

  const { director, year, language, imdb, genre } = req.query;

  let filter = {};
  if (director) filter.director = director;
  if (year) filter.year = year;
  if (language) filter.language = language;
  if (genre) filter.genre = genre;
  if (imdb) filter.imdb = imdb;

  try {
    const movies = await Movie.find(filter);
    const count = await Movie.countDocuments(filter);
    if(!movies || movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }
    res.status(200).json({ message: "Movies Found",count:count,movies:movies});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//search movie by title
const searchMovies = async (req, res) => {
  try{
const searchTitle = req.query.title;
const movies = await Movie.find({title: {$regex: new RegExp(searchTitle), $options: 'i'}});
const count = await Movie.countDocuments({title: {$regex: new RegExp(searchTitle), $options: 'i'}})
if(!movies || movies.length === 0) {
  return res.status(404).json({ message: "No movies found" });
}
res.status(200).json({message: "Movie found",count: count, movie: movies});
} catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//language count 
const languageCount = async (req, res) => {
  try {
    const language = req.query.language;
    const count = await Movie.countDocuments({ language: language });
    const movies = await Movie.find({ language: language });
    if (!count || count === 0) {
      return res.status(406).json({ message: "No movies found" });
    }
    res.status(200).json({ message: "Movies Found",language: language, count: count, movies: movies });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { allMovies, addMovie, getMovie, updateMovie, deleteMovie, filterMovies , searchMovies, languageCount};