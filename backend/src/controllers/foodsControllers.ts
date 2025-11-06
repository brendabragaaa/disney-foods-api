import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Food } from "../entities/Food";
import { User } from "../entities/User";
import { Movie } from "../entities/Movie";

const foodRepository = AppDataSource.getRepository(Food);
const userRepository = AppDataSource.getRepository(User);
const movieRepository = AppDataSource.getRepository(Movie);

const parseId = (id?: string): number | null => {
    if (!id) {
        return null;
    }
    const parsed = parseInt(id, 10);
    return isNaN(parsed) ? null : parsed;
};

const validateFoodBody = (body: any) => {
    const { name, description, ingredients, recipe, isMagical } = body;
    if ( !name || !description || !ingredients || !recipe || isMagical === undefined) {
        return false;
    }
    return true;
};

export const createFood = async (req: Request, res: Response) => {
    try {
        const { name, description, ingredients, recipe, isMagical, movieId } = req.body;
        const userId = (req as any).user.id; 

        if (!name || !description || !ingredients || !recipe || isMagical === undefined || !movieId) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios (incluindo movieId)." });
        }

        const user = await userRepository.findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        const movie = await movieRepository.findOneBy({ id: movieId });
        if (!movie) {
            return res.status(404).json({ error: "Filme não encontrado." });
        }

        const newFood = foodRepository.create({
            name,
            description,
            ingredients,
            recipe,
            isMagical,
            user,
            movie,
        });

        const savedFood = await foodRepository.save(newFood);

        return res.status(201).json({
            message: "Receita cadastrada!",
            food: savedFood,
        });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao salvar comida", details: error });
    }
};

export const getFoods = async (_req: Request, res: Response) => {
    const foods = await foodRepository.find();
    return res.json(foods);
};

export const getFoodbyId = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);

    if(!id) {
        return res.status(400).json({ error: "ID é obrigatório." });
    }

    const food = await foodRepository.findOneBy({ id });

    if(!food) {
        return res.status(404).json({ error: "Receita não encontrada!" });
    }

    return res.json(food);
};

export const updateFood = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    const userId = (req as any).user.id; // vem do authMiddleware

    if (!id) {
        return res.status(400).json({ error: "ID inválido." });
    }

    const food = await foodRepository.findOne({
        where: { id },
        relations: ["user"], // carrega o dono da receita
    });

    if (!food) {
        return res.status(404).json({ error: "Receita não encontrada!" });
    }

    if (food.user.id !== userId) {
        return res.status(403).json({ error: "Você não pode editar receitas de outro usuário." });
    }

    foodRepository.merge(food, req.body);
    const updatedFood = await foodRepository.save(food);

    return res.json({
        message: "Receita atualizada!",
        food: updatedFood,
    });
};

export const deleteFood = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    const userId = (req as any).user.id;

    if (!id) {
        return res.status(400).json({ error: "ID inválido." });
    }

    const food = await foodRepository.findOne({
        where: { id },
        relations: ["user"],
    });

    if (!food) {
        return res.status(404).json({ error: "Receita não encontrada!" });
    }

    if (food.user.id !== userId) {
        return res.status(403).json({ error: "Você não pode excluir receitas de outro usuário." });
    }

    await foodRepository.delete(id);

    return res.json({ message: "Receita excluída com sucesso." });
};

export const searchFoods = async (req: Request, res: Response) => {
    const query = req.query.query as string;

    if (!query) {
        return res.status(400).json({error: "Query é obrigatória."});
    }

    const foods = await foodRepository
        .createQueryBuilder("food")
        .where("food.name LIKE :query", { query: `${query}%`})
        .getMany();

    return res.json(foods);
};