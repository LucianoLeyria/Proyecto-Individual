import React from "react";
import "../css/Paginado.css";

export default function Paginado({
  videogamesPerPage,
  allVideogames,
  paginado,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul className="ul">
        {pageNumbers?.map((number) => (
          <li className="paginado" key={number}>
            <button
              className={`botonPaginado ${
                currentPage === number ? "current-page" : ""
              }`}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
