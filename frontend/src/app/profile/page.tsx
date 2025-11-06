"use client";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function ProfilePage() {
  return (
    <Container className="mt-5">
      <Row>
        <Col className="text-center">
          <h2>Meu Perfil</h2>
          <p>Aqui você pode gerenciar seus filmes e receitas favoritas.</p>
        </Col>
      </Row>

      <Row className="mt-4 g-4 justify-content-center">
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title>Adicionar Filme</Card.Title>
              <Card.Text>Cadastre um novo filme e suas informações</Card.Text>
              <Button variant="primary" href="/add-movie">
                Adicionar Filme
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title>Adicionar Receita</Card.Title>
              <Card.Text>Cadastre uma nova receita deliciosa</Card.Text>
              <Button variant="success" href="/add-recipe">
                Adicionar Receita
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
