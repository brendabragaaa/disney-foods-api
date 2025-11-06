import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import moviesRoutes from "./routes/moviesRoutes";
import foodsRoutes from "./routes/foodsRoutes";
import searchRoutes from "./routes/searchRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(express.json());

app.get("/healthcheck", (req, res) => {
    res.json({ status: "ok" })
});

app.use("/movies", moviesRoutes);
app.use("/foods", foodsRoutes);
app.use("/search", searchRoutes);
app.use("/users", userRoutes);


AppDataSource.initialize()
    .then(() => {
        console.log("Banco conectado com sucesso!")

        app.listen(4000, () => {
            console.log("API rodando!");
        });
    })
    .catch((error) => console.error("Erro ao conectar no banco: ", error))