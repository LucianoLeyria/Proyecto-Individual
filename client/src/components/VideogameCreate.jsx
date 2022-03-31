import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postVideogame, getGenres, getVideogames } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "../css/VideogameCreate.css";

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const videogames = useSelector((state) => state.videogames);
  const platforms = useSelector((state) => state.platforms);

  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      genres: input.genres.includes(e.target.value)
        ? input.genres
        : [...input.genres, e.target.value],
    });
  }

  function handleSelect2(e) {
    setInput({
      ...input,
      platforms: input.platforms.includes(e.target.value)
        ? input.platforms
        : [...input.platforms, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.name.trim()) {
      return alert("Need to put a name");
    } else if (
      videogames.find(
        (e) => e.name.toLowerCase().trim() === input.name.toLowerCase().trim()
      )
    ) {
      return alert(`The name ${input.name} already exist`);
    } else if (input.description.trim() === "") {
      return alert("Description required");
    } else if (input.released.trim() === "") {
      return alert("Released required");
    } else if (input.released < "1951-05-03") {
      return alert("Date can't be below that 03/05/1951");
    } else if (
      input.rating.trim() === "" ||
      input.rating < 1 ||
      input.rating > 5
    ) {
      return alert("Must be between 1 and 5");
    } else if (input.genres.length === 0) {
      return alert("Select one or more genres");
    } else if (input.platforms.length === 0) {
      return alert("Select one or more platforms");
    } else {
      dispatch(postVideogame(input));
      alert("Videogame created!!! 😀 ");
      setInput({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
      });
      document.getElementById("formulario").reset();
      window.location.reload();
    }
  }

  function handleDelete(e) {
    setInput({
      ...input,
      genres: input.genres.filter((el) => el !== e),
    });
  }

  function handleDelete2(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((el) => el !== e),
    });
  }

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <div className="fondoV">
      <div className="contenedorAll">
        <h1 className="tituloVideogame">CREATE YOUR GAME</h1>
        <form id="formulario" onSubmit={(e) => handleSubmit(e)}>
          <div className="item">
            <label className="label">Name:</label>
            <br></br>
            <input
              className="input"
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="item">
            <label className="label">Released:</label>
            <br></br>
            <input
              className="input"
              type="date"
              value={input.released}
              name="released"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="item">
            <label className="label">Rating:</label>
            <br></br>
            <input
              className="input"
              type="number"
              value={input.rating}
              name="rating"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="item">
            <label className="label">Image:</label>
            <br></br>
            <input
              className="input"
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <label className="label">Genres:</label>
            <br></br>
            <select
              className="input"
              defaultValue="Select"
              onChange={(e) => handleSelect(e)}
            >
              <option disabled>Select</option>
              {genres?.map((e) => (
                <option className="select" value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>

            <ul className="ul">
              <li className="listaGP">
                {input.genres.map((e) => (
                  <div className="divGP" key={e}>
                    {e + " "}
                    <button type="button" onClick={() => handleDelete(e)}>
                      X
                    </button>
                  </div>
                ))}
              </li>
            </ul>
          </div>
          <div className="item">
            <label className="label">Platforms:</label>
            <br></br>
            <select
              className="input"
              defaultValue="Select"
              onChange={(e) => handleSelect2(e)}
            >
              <option disabled>Select</option>
              {platforms?.map((e) => (
                <option className="select" value={e} key={e}>
                  {e}
                </option>
              ))}
            </select>
            <ul className="ul">
              {input.platforms.map((e) => (
                <li key={e} className="listaGP">
                  <div className="divGP">
                    {e + " "}
                    <button type="button" onClick={() => handleDelete2(e)}>
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="item">
            <label className="label">Description: </label>
            <br></br>
            <input
              className="input"
              type="text"
              value={input.description}
              name="description"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <button className="botonCreateVideogame" type="submit">
              Create videogame
            </button>
          </div>
          <div>
            <Link to="/home">
              <button className="botonHome">Go Home</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
