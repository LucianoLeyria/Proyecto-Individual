import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions";
import "../css/SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      return alert("Need to put a name");
    } else {
      dispatch(getNameVideogames(name));
      setName("");
      document.getElementById("search").value = "";
    }
  }

  return (
    <div className="searchBar">
      <input
        className="inputs"
        id="search"
        type="text"
        placeholder="Search videogame"
        onChange={(e) => handleInputChange(e)}
      />
      <button className="buttons" type="submit" onClick={(e) => handleSubmit(e)}>
        SEARCH
      </button>
    </div>
  );
}
