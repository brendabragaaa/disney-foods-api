"use client";
import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function AddRecipePage() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nova receita:", { name, ingredients });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Adicionar Receita</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome da Receita</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ingredientes</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="success" className="w-100">
          Salvar Receita
        </Button>
      </Form>
    </Container>
  );
}
