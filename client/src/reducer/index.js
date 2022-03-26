import { GET_INICIAL, 
    TRAER_UNO_NOMBRE,
    FILTRAR_ORIGEN,
    TRAER_TODOS, 
    TRAER_GENEROS, 
    ORDENAR_ALFABETICAMENTE, 
    ORDENAR_PUNTUACION, 
    TRAER_DETALLES,
    ORDENAR_GENEROS, 
    BORRAR_DETALLES,
    SET_FAVORITOS,
    BORRAR_FAVORITO } from '../action/constantes.js'

let initialState = {
    videogames: [], // filt x gen
    allvideogames: [], //all 
    favoritos: [],  // pa borrar 
    genres: [],
    detail: null,
    flagLoad: false
}


function rootReducer (state = initialState, action) {

    switch (action.type) {
        

        case BORRAR_FAVORITO:
            return {
                ...state,
                favoritos: state.favoritos.filter(games => games.id !== action.payload)
            }

        case SET_FAVORITOS:
            return {
                ...state,
                favoritos: [...state.favoritos, action.payload] 
            }
        
        case GET_INICIAL:
                return {
                    ...state,
                    flagLoad:true
                }
        case TRAER_TODOS:
                return {
                    ...state,
                    videogames: action.payload,
                    allvideogames: action.payload,
                    flagLoad:false
                };

        case TRAER_GENEROS:
                return {
                    ...state,
                    genres: action.payload,
                };

        case ORDENAR_ALFABETICAMENTE:
            let aordenar = [...state.videogames]
                switch(action.payload){
                case "ASCENDENTE":
                    
                    return {
                        ...state,
                            videogames: aordenar.sort(function( a , b ){
                            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                            return 0
                        })
                    };
                case "DESCENDENTE":
                    return {
                        ...state,
                        videogames: aordenar.sort((a ,b) => {
                            if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                            if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                            return 0
                         })
                    };
                case "SIN":
                    return {
                        ...state,
                        videogames: [...state.allvideogames]
                    };
                default:
                    return {
                        ...state
                    }
                };

        case ORDENAR_PUNTUACION:
            let aordenarrat = [...state.videogames]
                switch(action.payload){
                case "ASCENDENTE":
                    return {
                                ...state,
                                videogames: aordenarrat.sort(function(a,b){
                                    if(a.rating > b.rating) return -1;
                                    if(a.rating < b.rating) return 1;
                                    return 0
                                })
                        };
                case "DESCENDENTE":
                    return {
                                ...state,
                                videogames: aordenarrat.sort((a, b) => {
                                    if(a.rating > b.rating) return 1;
                                    if(a.rating < b.rating) return -1;
                                    return 0
                                 })
                        }
                case "SIN":
                    return {
                                ...state,
                                videogames: [...state.allvideogames]
                        }
                default:
                    return {
                        ...state
                        }
                    };

        case ORDENAR_GENEROS:
            const AllVideogames = state.allvideogames;
      const genresFiltered = action.payload === "TODOS" ? AllVideogames : AllVideogames.filter((game) =>  game.genres.find((genre) => {
                return genre.name === action.payload;
                    })
            );
                    return {
        ...state,
        videogames: genresFiltered,
                    };

        case TRAER_DETALLES:
        return {
        ...state,
        detail: action.payload,
                };
        case BORRAR_DETALLES:
            return {
            ...state,
            detail: null,
                    };
        case TRAER_UNO_NOMBRE:
            return {
            ...state,
            videogames: action.payload,
            flagLoad: false,
            };
        
        case FILTRAR_ORIGEN:
            const AllVideogames2 = state.allvideogames;
            const filterByOrigin =
            action.payload === "db" ?
           AllVideogames2.filter((e) => e.createdInDb === true)
          : 
          AllVideogames2.filter((e) => e.createdInDb === false);
          return {
            ...state,
            videogames:
              action.payload === "todos" ? state.allvideogames : filterByOrigin,
          };      


        default: 
                return { ...state}
    }
}


export default rootReducer