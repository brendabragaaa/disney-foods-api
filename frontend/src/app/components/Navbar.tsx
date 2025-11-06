"use client";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaFilm, FaUtensils, FaUser } from "react-icons/fa";

export default function DisneyNavbar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query)}`);
            setQuery("");
        }
    };

    return (
        <Navbar expand="lg" className="mb-4 shadow-sm bg-dark navbar-dark py-3">
            <Container fluid className="px-5">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto align-items-center gap-3">
                        <Nav.Link href="/" className="d-flex align-items-center text-light hover-link">
                            <img
                                src="/disney-logo.png"
                                alt="Disney Logo"
                                style={{
                                    width: "42px",
                                    height: "42px",
                                    marginRight: "10px",
                                    objectFit: "contain",
                                }}
                            />
                            Disney Foods
                        </Nav.Link>

                        <Nav.Link href="/movies" className="d-flex align-items-center text-light hover-link">
                            <FaFilm className="me-1" />
                            Filmes
                        </Nav.Link>

                        <Nav.Link href="/foods" className="d-flex align-items-center text-light hover-link">
                            <FaUtensils className="me-1" />
                            Receitas
                        </Nav.Link>

                        <Nav.Link href="/profile" className="d-flex align-items-center text-light hover-link">
                            <FaUser className="me-1" />
                            Meu Perfil
                        </Nav.Link>
                    </Nav>

                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Pesquisar..."
                            className="me-2"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button type="submit" variant="outline-light">
                            Buscar
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}