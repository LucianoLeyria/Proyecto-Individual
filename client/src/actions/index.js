import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    const json = await axios.get("/videogames");
    return dispatch({
      type: "GET_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function getDetail(id) {
  return (dispatch) => {
    axios
      .get("/videogame/" + id)
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
      var json = await axios.get("/videogames?name=" + payload);
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
    const json = await axios.get("/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}

export function postVideogame(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/videogame", payload);
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
