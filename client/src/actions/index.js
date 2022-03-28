import axios from "axios";

//GET PARA TRAER TODOS LOS VIDEOJUEGOS. Aqui es donde se conecta el Back con el Front
export function getVideogames() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
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
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
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

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/videogame/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function vaciarDetail() {
  return {
    type: "VACIAR_DETAIL",
  };
}
