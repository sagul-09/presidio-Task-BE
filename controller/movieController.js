import Movie from "../model/movieModel.js";

//get all movies from database
const allMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add movie to database
const addMovie = async (req, res) => {
  try {
    const movie = new Movie({
      title: req.body.title.toLowerCase(),
      director: req.body.director.toLowerCase(),
      year: req.body.year,
      language: req.body.language.toLowerCase(),
      genre: req.body.genre.toLowerCase(),
      imdb: req.body.imdb,
    });
    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get movie by ID
const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
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
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      movie.title = req.body.title.toLowerCase();
      movie.director = req.body.director.toLowerCase();
      movie.year = req.body.year;
      movie.language = req.body.language.toLowerCase();
      movie.genre = req.body.genre.toLowerCase();
      movie.imdb = req.body.imdb;
      const updatedMovie = await movie.save();
      res.json(updatedMovie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete movie by ID
const deleteMovie = async (req, res) => {
  try {
    const movie= await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


//movie filter by title, director, year, language, genre, imdb
const filterMovies = async (req, res) => {

  const { title, director, year, language, imdb, genre } = req.query;

  let filter = {};
  if (title) filter.title = title;
  if (director) filter.director = director;
  if (year) filter.year = year;
  if (language) filter.language = language;
  if (genre) filter.genre = genre;
  if (imdb) filter.imdb = imdb;

  try {
    const movies = await Movie.find(filter);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//search movie by title
const searchMovies = async (req, res) => {
  try{
const searchTitle = req.query.title;
const movies = await Movie.findOne({title: searchTitle});
res.json(movies);
} catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//language count is not working :(
const languageCount = async (req, res) => {
  try {
    const searchLanguage = req.query.language;
    console.log(searchLanguage);
    const count = await Movie.countDocuments({ language: searchLanguage });
    res.status(200).json({ language: searchLanguage, count: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { allMovies, addMovie, getMovie, updateMovie, deleteMovie, filterMovies , searchMovies, languageCount};