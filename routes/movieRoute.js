import express from "express";
import {allMovies,addMovie,getMovie,updateMovie,deleteMovie} from "../controller/movieController.js";
const router = express.Router();

router.route("/").get(allMovies).post(addMovie);
router.route("/:id").get(getMovie).put(updateMovie).delete(deleteMovie);

export default router;