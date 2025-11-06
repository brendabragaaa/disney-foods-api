import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createFood, getFoods, getFoodbyId, updateFood, deleteFood } from "../controllers/foodsControllers";

const router = Router();

router.post("/", authMiddleware, createFood);
router.get("/", getFoods);
router.get("/:id", getFoodbyId);
router.put("/:id", authMiddleware, updateFood);
router.delete("/:id", authMiddleware, deleteFood);

export default router;


