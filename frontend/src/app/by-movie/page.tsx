"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Card, Row, Col, Spinner } from "react-bootstrap";
import api from "@/services/api";

interface Movie {
  id: number;
  title: string;
  recipesCount: number;
}

export default function ByMoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        setMovies(res.data || []);
      } catch (err) {
        console.error("Erro ao carregar filmes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Filmes e suas receitas</h2>
      <Row className="mt-3">
        {movies.map((movie) => (
          <Col md={4} key={movie.id} className="mb-4">
            <Link href={`/by-movie/${movie.id}`} style={{ textDecoration: "none" }}>
              <Card className="h-100 p-3" style={{ cursor: "pointer" }}>
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.recipesCount} receita(s) </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
