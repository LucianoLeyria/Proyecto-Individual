      //  {flagload === 'true' ? (
      //                       <div>
      //                       <div className="matrix">
      //                           <h1>cargando...</h1>
      //               <img src="../assets/statics/matrix-code.gif" alt="" />
      //                           </div>
      //                           </div>
      //               )
      //   :  
      //           (
      //               <div>
                    
      //       {juegosenpantalla.length ? 
                
      //       (juegosenpantalla.map((e)=>{
      //           return( 
      //               <Card 
      //               image={e.image}
      //               name={e.name}
      //               key={e.id}
      //               genres={e.genres}
      //               /> )
      //       })

      //           )
      //       :
      //           ( 
      //           <div className="matrix">
      //           <img src="../assets/statics/matrix-code.gif" alt="" />
      //           </div> 
      //       )
      //       }
        
      //               </div>
      //           )
      //   }




      //   ----------------------------------------------------------------------

      //   export function getAllVideogames() {
      //       return (dispatch) => {
      //         axios
      //           .get("http://localhost:3001/videogames")
      //           .then((juegos) => { dispatch({
      //               type: GET_ALL_VIDEOGAMES,
      //               payload: juegos.data,
      //             });
      //           })
      //           .catch((error) => console.log(error));
      //       };
      //     }



      //     export function getAllGenres() {
      //       return (dispatch) => {
      //         axios.get("http://localhost:3001/genres").then((generos) => {
      //           dispatch({
      //             type: GET_ALL_GENRES,
      //             payload: generos.data,
      //           });
      //         });
      //       };
      //     }


      //     export function getVideogameDetail(id) {
      //       return (dispatch) => {
      //         axios.get("http://localhost:3001/videogame/" + id)
      //           .then((game) => { dispatch({
      //             type: GET_VIDEOGAME_DETAIL,
      //             payload: game.data,
      //           });
      //         });
      //       };
      //     }



// --------------------------------------------------------------------

/**
 * ! botn paginado atras y adelante
 */
{/* <nav>
        <div className="contenedorboton">
        {ultimapagina ? (<button className="numero"
        onClick={()=>prev()}>prv
        </button>):(null)}
        {pageNumbers?.map(numero =>(
             <button className="numero"
                    key={numero} 
                    onClick={() => 
                    paginado(numero)}>
                        {numero}
                    </button>
                ))
            }
        {ultimapagina ? (<button className="numero"
        onClick={()=>sig()}>prv
        </button>):(null)}
            
        </div>
    </nav> */}


    // const prev =function(){
    //   if(aquiyahora > 1) {
    //     setaquiyahora(aquiyahora - 1)
    //   }
    // }
    // const sig =function(){
    //   if(aquiyahora < ultimapagina) {
    //     setaquiyahora(aquiyahora + 1)
    //   }
    // }


/**
 * !boton delete con estilos
 */
{/* <div className={style.divBotDel}>
                {detallado.createdInDb ?  (
                    <button onClick={(e)=>handleondelete(e)}
                            value={id}
                            className={style.botondelete}>  
                            X
                            </button>
                ):(null) }

            </div> */}

            // export function borrarjuego(payload) {
            //     return async function () {
            //         try {
            //             let json = await axios.delete("http://localhost:3001/api/videogame/" + payload)
            //             console.log(payload)
            //             alert('se borro el juego')
            //             return json
            //         } catch(error) {
            //             console.log(error)
            //             alert(`no se borro nada: ${error}`)
            //         }
            //     }
            // }

            // function handleondelete(e){
            //     e.preventDefault();
            //     dispatch(borrarjuego(e.target.value))
            //     history.push("/home");
            //     dispatch(getAllVideoGames());
            // }

            // const history = useHistory();

            // import {borrarjuego} from '../action/index'
            // import { useHistory } from "react-router-dom";

/**
 * !ruta para borrar
 */

            // router.delete(`/:idVideogame`, async (req, res) => {
      
            //     const { idVideogame } = req.params
            //     console.log(idVideogame)
            //     try {
            //       return await Videogame.destroy({
            //         where: {
            //            id: idVideogame
            //         }
            //      }).then(function(rowDeleted){
            //        if(rowDeleted === 1){res.status(200).json('borrado con exito');
            //         }
            //      }, function(err){
            //          res.status(408).json('no se borro nada, el parametro estaba mal'); 
            //      });
                  
            //     } catch(error) {
            //       res.status(406).json('no se borro nada')
            //     }
            //   })