import React from "react";
import "../css/Card.css";

export default function Card({ name, image, genres, rating }) {
  return (
    <div className="cards_item">
      <div className="card">
        <h2 className="nombre">{name}</h2>
        <img className="imagen" src={image} alt="img not found" />
        <h2 className="genres">💎 Generos: {genres.join(",  ")}</h2>
        <h2 className="rating">🏆 Rating: {rating}</h2>
      </div>
    </div>
  );
}



               

