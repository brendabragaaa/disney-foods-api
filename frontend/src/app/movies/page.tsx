"use client";
import { useEffect, useState } from "react";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import api from "@/services/api";

interface Movie {
  id: number;
  title: string;
  releaseYear: number;
  genre: string;
}

export default function moviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await api.get("/movies");
        setMovies(res.data);
      } catch (err) {
        console.error("Erro ao buscar filme:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
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
      <h1>Filmes</h1>
      {movies.map((m) => (
        <Card key={m.id} className="mb-3">
          <Card.Body>
            <Card.Title>{m.title} ({m.releaseYear})</Card.Title>
            <Card.Text>{m.genre}</Card.Text>
            <Button variant="primary" href={`/movies/${m.id}`}>
              Ver detalhes
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
