import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterVideogamesByGenres,
  orderByName,
  filterCreated,
  orderByRating,
  getGenres,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import loadingBar from "../css/loading-35.gif";
import notfound from "../css/notfound.jpg";
import "../css/Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);

  const [, /*orden*/ setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage /*setVideogamesPerPage*/] = useState(15);

  const indexOfLastVideogame = currentPage * videogamesPerPage; //  current (2) * 15 (games per page) = 30. entonces el last index is 30.
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; //   30 (result de arriba) - 15 (games per page) = 15

  //Videogames que estan en la pagina actual
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame, // siempre van a ser 15 , el slice lo corta
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames())
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  }, [dispatch]);

  function handleRefresh(e) {
    window.location.reload();
  }

  function handleFilterGenres(e) {
    dispatch(filterVideogamesByGenres(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleSort(e) {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  function handleSort2(e) {
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <img src={loadingBar} className="loading" alt="loading please wait" />
      </div>
    );
  }

  return (
    <div className="fondoLoading">
      <div className="barra">
        <select
          className="selector"
          defaultValue="Genres"
          onChange={(e) => handleFilterGenres(e)}
        >
          <option className="options" disabled>
            Genres
          </option>
          <option className="options" value="All">
            All
          </option>
          {genres.map((g) => (
            <option className="options" key={g.id} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>

        <select
          className="selector"
          defaultValue="Origin"
          onChange={(e) => handleFilterCreated(e)}
        >
          <option className="options" disabled>
            Origin
          </option>
          <option className="options" value="All">
            All
          </option>
          <option className="options" value="created">
            Created
          </option>
          <option className="options" value="api">
            Api
          </option>
        </select>

        <select
          className="selector"
          defaultValue="Order"
          onChange={(e) => handleSort(e)}
        >
          <option className="options" disabled>
            Order
          </option>
          <option className="options" value="asc">
            A-Z
          </option>
          <option className="options" value="desc">
            Z-A
          </option>
        </select>

        <select
          className="selector"
          defaultValue="Rating"
          onChange={(e) => handleSort2(e)}
        >
          <option className="options" disabled>
            Rating
          </option>
          <option className="options" value="high">
            HIGH
          </option>
          <option className="options" value="low">
            LOW
          </option>
        </select>

        <h1 className="titulo">VIDEOGAMES</h1>
        <button
          className="botonRefresh"
          onClick={(e) => {
            handleRefresh(e);
          }}
        >
          REFRESH ALL
        </button>
        <Link to="/videogame">
          <button className="botonCreate">CREATE YOUR VIDEOGAME</button>
        </Link>
      </div>

      <div>
        <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
          currentPage={currentPage}
        />

        <SearchBar />

        <div className="card_contenedor">
          {currentVideogames.length > 0 ? (
            currentVideogames.map((e) => {
              return (
                <div key={e.id}>
                  <Link to={"/home/" + e.id}>
                    <Card
                      name={e.name}
                      image={e.image}
                      genres={e.genres}
                      rating={e.rating}
                    />
                  </Link>
                </div>
              );
            })
          ) : (
            <div>
              <h1 className="error">INVALID NAME </h1>
              <img src={notfound} className="notfound" alt="not found" />
            </div>
          )}
        </div>

        <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
