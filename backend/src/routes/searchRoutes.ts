import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/Movie";
import { Food } from "../entities/Food";

const router = Router();
const movieRepository = AppDataSource.getRepository(Movie);
const foodRepository = AppDataSource.getRepository(Food);

router.get("/", async (req: Request, res: Response) => {
    console.log("req.query:", req.query);
    const query = (req.query.query as string)?.toLowerCase();

    if (!query) {
        return res.status(400).json({ error: "Parâmetro 'query' é obrigatório." });
    }

    try {
        const movies = await movieRepository
            .createQueryBuilder("movie")
            .where("LOWER(movie.title) LIKE :query", { query: `%${query}%` })
            .getMany();

        const foods = await foodRepository
            .createQueryBuilder("food")
            .where("LOWER(food.name) LIKE :query", { query: `%${query}%` })
            .getMany();

        return res.json({ movies, foods });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar dados", details: error });
    }
});

export default router;
