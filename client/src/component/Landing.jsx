import React from 'react'
import { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideoGames, getGenres } from "../action";
import { Link } from "react-router-dom";
import style from '../assets/styles/landing.module.css'



const Landing = () => {

  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videogames);
  const genres = useSelector((state)=>state.genres);

  useEffect(()=>{
    if(!genres.length) {dispatch(getGenres())}
});
useEffect(() => {
    if (!videogames.length) {
        dispatch(getAllVideoGames())
    }
});

  return (
    <div>
        {videogames.length < 5 ? (
        <div className={style.landing}>
     <div className={style.conectStart}>.</div>
    </div>):(<div className={style.landing}>
      <Link to='/home'>
     <button className={style.ButtonStart}>
             Start
         </button>

         
     </Link>
    </div>)}



    </div>
  )
}

export default Landing