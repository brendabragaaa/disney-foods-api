"use client";
import "./global.css";

export default function Loading({ message = "Carregando..." }) {
  return (
    <div className="loader-container">
      <div className="custom-spinner"></div>
      <p>{message}</p>
    </div>
  );
}
