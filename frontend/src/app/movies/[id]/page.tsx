"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Card, Spinner } from "react-bootstrap";
import api from "@/services/api";

interface Movie {
  id: number;
  title: string;
  releaseYear: number;
  genre: string;
}

export default function MovieDetailPage() {
  const params = useParams();
  const { id } = params;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Erro ao carregar filme:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container className="mt-5">
        <p>FIlme não encontrado.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <h2>{movie.title}</h2>
        <p>{movie.genre}</p>
        <p>{movie.releaseYear}</p>
      </Card>
    </Container>
  );
}