"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Spinner, Card } from "react-bootstrap";
import api from "@/services/api";

interface Food {
  id: number;
  name: string;
  description: string;
  ingredients: string[] | string;
  recipe: string[] | string;
  isMagical: boolean;
}

export default function FoodDetailPage() {
  const params = useParams();
  const { id } = params;

  const [food, setFood] = useState<Food | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await api.get(`/foods/${id}`);
        setFood(res.data);
      } catch (err) {
        console.error("Erro ao carregar receita:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFood();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!food) {
    return (
      <div className="recipe-container">
        <p>Receita não encontrada.</p>
      </div>
    );
  }

  const ingredients = Array.isArray(food.ingredients)
    ? food.ingredients
    : food.ingredients.split("\n");

  const recipeSteps = Array.isArray(food.recipe)
    ? food.recipe
    : food.recipe.split(/(?=\d+\.)/);

  return (
    <div className="recipe-container">
      <Card className="recipe-card title-card mb-4">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
            <h3>Tipo</h3>
            <p>{food.isMagical ? "✨ Mágico" : "Normal"}</p>
      </Card>

      <div className="recipe-row">
        <div className="recipe-col">
          <Card className="recipe-card mb-3">
            <h3>Ingredientes</h3>
            <ul>
              {ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Coluna de modo de preparo */}
        <div className="recipe-col">
          <Card className="recipe-card">
            <h3>Modo de Preparo</h3>
            <ol>
              {recipeSteps.map((step, i) => (
                <li key={i}>{step.trim().replace(/^\d+\.\s*/, "")}</li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
