import express from "express";
import {allMovies, addMovie,getMovie,updateMovie, deleteMovie, filterMovies} from "../controller/movieController.js";
const router = express.Router();

router.route("/").get(allMovies).post(addMovie);
router.route("/filter").get(filterMovies);
router.route("/:id").get(getMovie).put(updateMovie).delete(deleteMovie);

export default router;