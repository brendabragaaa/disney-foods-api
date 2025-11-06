import { Router } from "express";
import { createMovie, getMovies, getMoviebyId, getMovieWithFoods, updateMovie, deleteMovie } from "../controllers/moviesController";

const router = Router();

router.post("/", createMovie);
router.get("/", getMovies);
router.get("/:id/foods", getMovieWithFoods)
router.get("/:id", getMoviebyId);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
