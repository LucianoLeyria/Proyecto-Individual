import React from "react";
import Card from "./Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideoGames, getGenres, ordenalfabetico, ordenrating, ordengeneros, filtrarorigen } from "../action";
import Paginador from "./paginador";
import { Link } from "react-router-dom";
import loadergif from '../assets/statics/cirulito.gif'
import SearchBar from "./SearchBar";
import style from '../assets/styles/home.module.css'
import loader from '../assets/statics/transp.gif'
import gameover from '../assets/statics/ASBCM8.gif'



const Home = () => {
    const dispatch = useDispatch();
    const videogames = useSelector((state) => state.videogames);
    const genres = useSelector((state)=>state.genres);
    
    
    const flagLoad = useSelector((state) => state.flagLoad);
    //console.log(flagLoad)
    
    const [ aquiyahora, setaquiyahora] = useState(1)
    // const [orden, setOrden] = useState("")
    const vistaporpagina = 14;
    
    console.log(videogames)
  
    
    const mostrarultimo = aquiyahora * vistaporpagina
    const mostrarprimer = mostrarultimo - vistaporpagina
    const juegosenpantalla = videogames.slice(mostrarprimer, mostrarultimo)
    //console.log(juegosenpantalla)
    
    const paginado = (numero) =>{
        setaquiyahora(numero)
    }  
    function handlefiltrodeorigen(e) {
      setaquiyahora(1)
      dispatch(filtrarorigen(e.target.value));
    }
    function handleOrdenrating(e){
        e.preventDefault();
        dispatch(ordenrating(e.target.value));
        setaquiyahora(1)
    }
    
    function handleOrdenAlfabetico(e){
        e.preventDefault();
        dispatch(ordenalfabetico(e.target.value));
        setaquiyahora(1);
       }

    function handleOrdenGeneros(e){
        e.preventDefault();
        dispatch(ordengeneros(e.target.value))
        setaquiyahora(1)
    }
    function handleResetsFilters() {
      dispatch(getAllVideoGames());
      setaquiyahora(1)
    }
    
    
    useEffect(()=>{
        if(!genres.length) {dispatch(getGenres())}
    });
    useEffect(() => {
        if (!videogames.length) {
            dispatch(getAllVideoGames())
        }
    },[dispatch]);

    window.scrollTo(0, 0);

    

return (
  <div className={style.Home}>
    <nav className={style.nav}>
      <SearchBar/>
      
      <div className={style.createVideogame}>
        

          <Link key='create' to="/crearvideogame">Crear Videojuego</Link>
        
        </div>

        <div className={style.divReset}>
            <button className={style.buttonReset} onClick={e => handleResetsFilters(e)}>
              limpiar busqueda
            </button>
        
        </div>

       
   
    <div className={style.filtersCss}>

        <div className={style.alphabeticalOrder}>
                
                <label className={style.labels}>Orden Alfabetico</label>
            
            <select
                className={style.selects}
                onChange={(e)=>handleOrdenAlfabetico(e)} >
                
                <option value="SIN">sin filtro (como lanata)</option>
                <option value="ASCENDENTE"> de la A a la Z</option>
                <option value="DESCENDENTE">de la Z a la A</option>
            </select>
        </div>

        <div className={style.OrderByRating}>
            <label className={style.labels} > Orden por Rating</label>
            <select className={style.selects}
                    onChange={(e)=>handleOrdenrating(e)}>
                <option value="SIN">sin filtro (como lanata)</option>
                <option value="ASCENDENTE">los mejores primeros</option>
                <option value="DESCENDENTE">los peores primeros</option>
            </select>
        </div>

        <div className={style.filterByGenres}>
            <label className={style.labels} >Orden por Genero</label>
            <select 
                className={style.selects}
                onChange={(e)=>handleOrdenGeneros(e)}>
                  
                <option value="TODOS">Todos</option>
                {genres.map((genero)=>(
                    <option key={genero.id}
                      required value={genero.name} >
                            {genero.name}
                </option>
                      ))}
            </select>
            </div>
            <div className={style.filterByOrigin}>
            <label className={style.labels}>Orden Por Origen </label>
            <select
              className={style.selects}
              onChange={(e) => handlefiltrodeorigen(e)}
            >
              <option value="todos" key="all">
                todos
              </option>
              <option value="db" key="Ctd">
                Videogames en DB interna
              </option>
              <option value="apiData" key="API">
                Videogames traidos de API
              </option>
            </select>
          </div>

        </div>
        
        <Paginador
        cantidadJuegos={vistaporpagina}
        allVideogames={videogames.length}
        paginado={paginado}
                />
      
        </nav
        > 
        {flagLoad ? (
        <div >
        <div className={style.LoaderGif}>
          <img className={style.imagloadtrannohay} src={loader} alt="loader.gif" />
        </div>
        
      </div>
      ) : (
        <div className={style.parent}>
         

          


          {juegosenpantalla.length ? 
          
          (
            juegosenpantalla.map((e) => {
              return (
                // <Link key={e.id} to={"/home/" + e.id}>
                <Card
                className
                image={e.image}
                name={e.name}
                key={e.id}
                genres={e.genres}
                rating={e.rating}
                id={e.id}
                />
                // </Link>
                
                );
              })
              ) 
              
              : (
                <div>
            <div className={style.sadCatGif}>
            <img src={gameover} alt="game over" />
          </div>
            <div className={style.noResultsDiv}>
              <h3>aqui no hay nada, juego terminado!... vuelve al inicio</h3>
            </div>
            </div>
          )}
          
        </div>
      )}
      
      </div>
      )

}

export default Home