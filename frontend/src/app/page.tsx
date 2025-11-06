"use client";
import Link from "next/link";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";

export default function HomePage() {
  return (
    <>
      <Container className="py-5">
        <Row className="g-4 align-items-stretch">
          <Col md={4} className="d-flex">
            <Card className="w-100 d-flex flex-column justify-content-center">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
                <Card.Title as="h2" className="mb-3">
                  Bem-Vindo ao Disney Foods!
                </Card.Title>
                <Card.Text className="mb-4">
                  Aqui você encontra receitas incríveis inspiradas e presentes
                  nos grandes clássicos da Disney
                </Card.Text>
                <h5 className="mb-3">Conheça o projeto:</h5>
                <Button variant="gold" href="/about" className="btn-gold">
                  Acesse
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Row className="g-4 align-items-stretch">
              <Col md={6} className="d-flex">
                <Link href="/foods" className="w-100 text-decoration-none">
                  <Card className="w-100 text-center d-flex flex-column justify-content-center">
                    <Card.Body>
                      <Card.Title>Receitas</Card.Title>
                      <Card.Text>Veja todas as receitas mágicas</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>

              <Col md={6} className="d-flex">
                <Link href="/movies" className="w-100 text-decoration-none">
                  <Card className="w-100 text-center d-flex flex-column justify-content-center">
                    <Card.Body>
                      <Card.Title>Filmes</Card.Title>
                      <Card.Text>
                        Explore o catálogo de filmes disponível até o momento em nosso site
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>

              <Col md={6} className="d-flex">
                <Link href="/by-movie" className="w-100 text-decoration-none">
                  <Card className="w-100 text-center d-flex flex-column justify-content-center">
                    <Card.Body>
                      <Card.Title>Receitas por Filmes</Card.Title>
                      <Card.Text>
                        Descubra receitas inspiradas em seus filmes favoritos
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>

              <Col md={6} className="d-flex">
                <Link href="/register" className="w-100 text-decoration-none">
                  <Card className="w-100 text-center d-flex flex-column justify-content-center">
                    <Card.Body>
                      <Card.Title>Meu Perfil</Card.Title>
                      <Card.Text>
                        Crie sua própria conta e adicione suas próprias receitas e filmes favoritos
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container className="py-5">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 rounded"
              src="/gifs/beignets.gif"
              alt="Beignets da Tiana"
            />
            <Carousel.Caption>
              <h3>Beignets da Tiana</h3>
              <p>Diretamente de “A Princesa e o Sapo”</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 rounded"
              src="/gifs/macaenvenenada.gif"
              alt="Maçã Envenenada"
            />
            <Carousel.Caption>
              <h3>Maçã Envenenada da Rainha Má</h3>
              <p>Frase a se pensar ainda</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 rounded"
              src="/gifs/damavagabundo.gif"
              alt="Espaguete da Dama e Vagabundo"
            />
            <Carousel.Caption>
              <h3>Espaguete com Almondêga</h3>
              <p>Um dos pratos mais românticos da Disney </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 rounded"
              src="/gifs/cookiesrapunzel.gif"
              alt="Cookies da Rapunzel"
            />
            <Carousel.Caption>
              <h3>Cookies de Chocolate da Rapunzel</h3>
              <p>Diretamente da Torre Secreta, um dos hobbies preferidos da Rapunzel</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
}
