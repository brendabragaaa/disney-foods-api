"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Spinner, Card, Row, Col, Button } from "react-bootstrap";
import api from "@/services/api";

interface Movie {
  id: number;
  title: string;
  releaseYear: number;
  genre: string;
}

interface Food {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  recipe: string;
  isMagical: boolean;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/search", { params: { query } });

        setMovies(res.data.movies || []);
        setFoods(res.data.foods || []);
      } catch (err) {
        console.error("Erro na busca: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (!query) {
    return (
      <Container className="mt-4">
        <h2>Pesquisa</h2>
        <p>Digite algo na busca para ver resultados.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Resultados da pesquisa por: "{query}"</h2>
      {loading ? (
        <div className="d-flex justify-content-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {/* Filmes */}
          <h3 className="mt-4">Filmes</h3>
          {movies.length > 0 ? (
            <Row className="g-3">
              {movies.map((m) => (
                <Col md={8} key={m.id}>
                  <Card className="shadow-sm w-100">
                    <Card.Body>
                      <Card.Title>{m.title}</Card.Title>
                      <Card.Text>
                        {m.releaseYear} - {m.genre}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>Nenhum filme encontrado.</p>
          )}

          {/* Receitas */}
          <h3 className="mt-4">Receitas</h3>
          {foods.length > 0 ? (
            <Row className="g-3">
              {foods.map((f) => (
                <Col md={8} key={f.id}>
                  <Card className="shadow-sm w-100">
                    <Card.Body>
                      <Card.Title>{f.name}</Card.Title>
                      <Card.Text>{f.description}</Card.Text>
                      <Link href={`/foods/${f.id}`} passHref>
                        <Button variant="primary">Ver detalhes</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>Nenhuma receita encontrada.</p>
          )}
        </>
      )}
    </Container>
  );
}