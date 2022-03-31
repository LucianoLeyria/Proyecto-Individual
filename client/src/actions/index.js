import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getDetail(id) {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/videogame/" + id)
      .then((game) => {
        dispatch({
          type: "GET_DETAIL",
          payload: game.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function filterVideogamesByGenres(payload) {
  return {
    type: "FILTER_BY_GENRES",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

export function getNameVideogames(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/videogames?name=" + payload
      );
      return dispatch({
        type: "GET_NAME_VIDEOGAMES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: "GET_NAME_VIDEOGAMES",
        payload: [],
      });
    }
  };
}

export function getGenres() {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/genres")
      .then((generos) => {
        dispatch({
          type: "GET_GENRES",
          payload: generos.data,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/videogame",
        payload
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export function flagLoad(payload) {
  return {
    type: "GET_LOADER",
    payload,
  };
}

export function vaciarDetail() {
  return {
    type: "VACIAR_DETAIL",
  };
}
