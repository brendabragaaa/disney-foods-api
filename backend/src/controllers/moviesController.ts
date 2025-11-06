import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/Movie";

const movieRepository = AppDataSource.getRepository(Movie);

const parseId = (id?: string): number | null => {
    if (!id) {
        return null;
    }
    const parsed = parseInt(id, 10);
    return isNaN(parsed) ? null : parsed;
};

const validateMovieBody = (body: any) => {
    const { title, releaseYear, genre } = body;
    if ( !title || releaseYear === null || !genre ) {
        return false;
    }
    return true;
};

export const createMovie = async (req: Request, res: Response) => {
    try {
        if (!validateMovieBody(req.body)) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios!"});
        }

        const newMovie = movieRepository.create(req.body);
        const savedMovie = await movieRepository.save(newMovie);

        return res.status(201).json({message: "Filme cadastrado!", movie: savedMovie})
    } catch (error: any) {
        return res.status(500).json({ error: "Erro ao salvar filme!", details: error});
    }
};

export const getMovies = async(_req: Request, res: Response) => {
  try {
    const movies = await movieRepository
      .createQueryBuilder("movie")
      .loadRelationCountAndMap("movie.recipesCount", "movie.foods") 
      .getMany();

    return res.json(movies);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar filmes", details: error });
  }
};

export const getMoviebyId = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    if(!id) {
        return res.status(400).json({ error: "ID inválido." });
    }

    const movie = await movieRepository.findOneBy({ id });

    if(!movie){
        return res.status(404).json({ error: "Filme não encontrado!"})
    }

    return res.json(movie);
};

export const getMovieWithFoods = async (req: Request, res: Response) => {
    const movieId = parseId(req.params.id);

    if (!movieId){
        return res.status(400).json({ error: "ID inválido." });
    }

    const movie = await movieRepository.findOne({ 
        where: { id: movieId },
        relations: ["foods"], 
    });

    if(!movie){
        return res.status(404).json({ error: "Filme não encontrado."})
    }

    return res.json(movie);
}

export const updateMovie = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);

    if (!id){
        return res.status(400).json({ error: "ID inválido." });
    } 

    const movie = await movieRepository.findOneBy({ id });
    if (!movie) {
        return res.status(404).json({ error: "Filme não encontrado!" });
    }

    const { title, releaseYear, genre } = req.body;
    const updates: Partial<Movie> = {};
    if (title !== undefined) {
        updates.title = title; 
    }

    if (releaseYear !== undefined) {
        updates.releaseYear = releaseYear;
    }

    if (genre !== undefined) {
        updates.genre = genre;
    }

    movieRepository.merge(movie, updates);
    const updatedMovie = await movieRepository.save(movie);

    return res.json({ message: "Filme atualizado!", movie: updatedMovie });
};

export const deleteMovie = async (req: Request, res: Response) => {
    const id = parseId(req.params.id);

    if (!id){
        return res.status(400).json({ error: "ID inválido."});
    }

    const result = await movieRepository.delete(id);

    if(result.affected === 0){
        return res.status(404).json({ error: "Filme não cadastrado."})
    }

    return res.json ({ message: "Filme excluído." });
};

export const searchMovies = async (req: Request, res: Response) => {
    const query = req.query.query as string;

    if (!query) {
        return res.status(400).json({error: "Query é obrigatória."});
    }

    const movies = await movieRepository
        .createQueryBuilder("movie")
        .where("movie.title LIKE :query", { query: `${query}%`})
        .getMany();

    return res.json(movies);
};
