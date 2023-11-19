import Movie from "../model/movieModel.js";

const allMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMovie = async (req, res) => {
  try {
    const movie = new Movie({
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      language: req.body.language,
      genre: req.body.genre,
      imdb: req.body.imdb,
    });
    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      movie.title = req.body.title;
      movie.director = req.body.director;
      movie.year = req.body.year;
      movie.language = req.body.language;
      movie.genre = req.body.genre;
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

const filterMovies = async (req, res) => {

  const { title, director, year, language, imdb } = req.query;

  let filter = {};
  if (title) filter.title = title;
  if (director) filter.director = director;
  if (year) filter.year = year;
  if (language) filter.language = language;
  if (imdb) filter.imdb = imdb;

  try {
    const movies = await Movie.find(filter);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { allMovies, addMovie, getMovie, updateMovie, deleteMovie, filterMovies };