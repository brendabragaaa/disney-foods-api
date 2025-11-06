"use client";
import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import api from "@/services/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { email, password: senha });
      setSuccess(true);
    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Criar Perfil</h2>

          {success ? (
            <div className="text-center">
              <Alert variant="success">Cadastro realizado com sucesso!</Alert>
              <Button variant="primary" href="/profile">
                Ver meu Perfil
              </Button>
            </div>
          ) : (
            <Form onSubmit={handleRegister} className="text-center">
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSenha">
                <Form.Control
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100">
                Registrar
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}
