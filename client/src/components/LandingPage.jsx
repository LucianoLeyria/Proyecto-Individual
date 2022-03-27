import React from "react";
import { Link } from "react-router-dom";
import "../css/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="fondo">
      <h1 className="title">"VIDEOGAMES PI"</h1>
      <Link to="/home">
        <button className="boton">HOME</button>
      </Link>
    </div>
  );
}
