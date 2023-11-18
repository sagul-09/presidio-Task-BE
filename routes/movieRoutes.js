import express from 'express';
const router =  express.Router();
import {getAllMovie, addMovie, suggestMovie} from "../controller/movieController.js";

router.route('./').get(getAllMovie);

router.route('./addMovie').post(addMovie);

router.route('./')

