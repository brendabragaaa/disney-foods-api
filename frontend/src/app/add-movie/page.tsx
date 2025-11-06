"use client";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function AddMoviePage() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Novo filme:", { title, year });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Adicionar Filme</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título do Filme</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ano de Lançamento</Form.Label>
          <Form.Control
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Salvar Filme
        </Button>
      </Form>
    </Container>
  );
}
