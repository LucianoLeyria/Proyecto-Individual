import axios from "axios"
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME'
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL'
export const GET_ALL_GENRES = 'GET_ALL_GENRES'
export const ORDER_BY = 'ORDER_BY'
export const CREATED_OR_EXIST = 'CREATED_OR_EXIST'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const POST_VIDEOGAME = 'POST_VIDEOGAME'
export const CLEAR_DETAIL = 'CLEAR_DETAIL'
export const LOADER = 'LOADER'



export function getAllVideoGames() {
    return async function (dispatch) {
        try {
            let data = await axios.get('http://localhost:3001/videogames',);
            dispatch({
                type: GET_ALL_VIDEOGAMES,
                payload: data.data,
            })
            //alert('se cargaron todos los juegos')
        } catch(error) {
            alert(`no se puede iniciar debido al ${error}`)
            console.log(error)
            
        }
    }
}

export function getVideogamesByName(name){
    return async function (dispatch) {
        try{
       let json = await axios.get('http://localhost:3001/videogames?name=' + name)
            dispatch( {
                type: GET_VIDEOGAMES_BY_NAME,
                payload: json.data
            })
        } catch(error) {
            alert(`no se puede iniciar debido al ${error}`) 
        }
        console.log("PROBANDO NAME" , name)
    }
}

    


export function getAllGenres() {
    
    return dispatch => {
        axios.get('http://localhost:3001/genres')
        .then(generos => {
            dispatch({
                type: GET_ALL_GENRES,
                payload: generos.data
            })
        })
    }
}



export function getVideogameDetail(id) {
    return dispatch => {
        axios.get('http://localhost:3001/videogame/' + id)
        .then(game => {
            dispatch({
                type: GET_VIDEOGAME_DETAIL,
                payload: game.data
            })
        })
    }
}

export function clearDetail(){
    return {
        type: CLEAR_DETAIL
    }
}
export function createVideogame(newVideogame){
    console.log(newVideogame)
    return dispatch => {
        axios.post('http://localhost:3001/videogame', newVideogame)
        .then(post => {
            dispatch({
                type: POST_VIDEOGAME,
                payload: post
            })
        })
    }
}

export function orderBy(payload) {
    return {
            type: ORDER_BY,
            payload,
    };
}

export function filterByGenre(payload) {
    return {
            type: FILTER_BY_GENRE,
            payload
    }
}

export function filterByCreatedOrExist(payload){
    console.log(payload)
    return {
            type: CREATED_OR_EXIST,
            payload
    }
}

export function loaderTrue(){
    return {
            type: LOADER,
    }
}
