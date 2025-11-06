import "reflect-metadata";
import { DataSource } from "typeorm";
import { Movie } from "./entities/Movie";
import { Food } from "./entities/Food";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "disneyfoods.sql",
    synchronize: true,
    logging: true,
    entities: [Movie, Food, User],
    migrations: [],
    subscribers: [],
});