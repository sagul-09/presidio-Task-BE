import express from "express";
import {allMovies, addMovie,getMovie,updateMovie, deleteMovie, filterMovies, searchMovies, languageCount} from "../controller/movieController.js";
const router = express.Router();

router.route("/").get(allMovies);
router.route("/add").post(addMovie);
router.route("/search").get(searchMovies);
router.route("/filter").get(filterMovies);
router.route("/language").get(languageCount);
router.route("/:id").get(getMovie).put(updateMovie).delete(deleteMovie);

export default router;