"use client";
import { useEffect, useState } from "react";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import api from "@/services/api";

interface Food {
  id: number;
  name: string;
  description: string;
}

export default function FoodsPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const res = await api.get("/foods");
        setFoods(res.data);
      } catch (err) {
        console.error("Erro ao buscar receitas:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFoods();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Receitas</h1>
      {foods.map((f) => (
        <Card key={f.id} className="mb-3">
          <Card.Body>
            <Card.Title>{f.name}</Card.Title>
            <Card.Text>{f.description}</Card.Text>
            <Button variant="primary" href={`/foods/${f.id}`}>
              Ver detalhes
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
