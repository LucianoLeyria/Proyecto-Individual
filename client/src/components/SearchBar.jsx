import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameVideogames, flagLoad } from "../actions";
import "../css/SearchBar.css";
// import loadingBar from "../css/loading-35.gif";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      return alert("Need to put a name");
    } else {
      dispatch(getNameVideogames(name));
      setName("");
      dispatch(flagLoad(true));
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
        value={name}
      />
      <button
        className="buttons"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        SEARCH
      </button>
    </div>
  );
}
