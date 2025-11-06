import Link from "next/link";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/CardBody";
import CardTitle from "react-bootstrap/CardTitle";
import CardText from "react-bootstrap/CardText";
import Button from "react-bootstrap/Button";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function getMovieById(id: string) {
  const url = `${API_BASE}/movies/${id}/foods`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Erro ao buscar filme: ${res.status} ${txt}`);
  }

  return res.json();
}

export default async function RecipesByMoviePage(
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ✅ precisa do await no Next.js 15+

    const movie = await getMovieById(id);
    const foods = movie?.foods ?? [];

    return (
      <Container className="mt-4">
        <h2>
          {movie.title} ({movie.releaseYear})
        </h2>
        <p>Gênero: {movie.genre}</p>

        <h3 className="mt-4">Receitas do Filme</h3>

        {foods.length > 0 ? (
          foods.map((food: any) => (
            <Card className="mb-3" key={food.id}>
              <CardBody>
                <CardTitle>{food.name}</CardTitle>
                <CardText>{food.description}</CardText>
                <Link href={`/foods/${food.id}`}>
                  <Button variant="primary">Ver detalhes</Button>
                </Link>
              </CardBody>
            </Card>
          ))
        ) : (
          <p>Nenhuma receita encontrada para este filme.</p>
        )}
      </Container>
    );
  } catch (err: any) {
    console.error("Erro em RecipesByMoviePage:", err);

    return (
      <Container className="mt-5">
        <h2>Erro ao carregar o filme</h2>
        <p>{err?.message ?? "Ocorreu um erro inesperado."}</p>
        <p>
          Verifique se o backend está rodando e se a variável{" "}
          <code>NEXT_PUBLIC_API_URL</code> está correta.
        </p>
      </Container>
    );
  }
}