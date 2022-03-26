import React from 'react'
import '../assets/styles/card.scss'
import playIcon from "../assets/statics/play-icon.png"
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'

export default function Card ({id,image, name, genres, rating, }) {
  const dispatch = useDispatch();
  


 
  const handledetalles = (e) => {
    <Link key={e.id} to={"/home/" + e.id}></Link>
  }

  return (
    
    <div className="card-item">
    <img className="card-item__img" src={image} alt={image}  />
    
    <div className="card-item__details">
      <div className='card-item__civ'>
      <p className="card-item__details--titleee" >&#11088;</p>
        <p className="card-item__details--titlee">{rating}</p>
    

    </div>
    
    <p className="card-item__details--title">{name}</p>
    <div className="card-item__details--subtitle">
            {genres.map((g)=>(
              <span key={g.id}>{g.name}/</span> 
              ))}
              

    </div>
 
    
    <Link key={id} to={"/home/" + id}>

  <img 
         alt="imagen"
         onClick={()=>handledetalles(id)} 
         className="card-item__imgeeee"
         src={playIcon} />
    </Link>
   
    
     

    {/* <img
          className='card-item__imgeee'
          src={deleteIcon}
    />
    <img  onClick={(e)=>handleSetFavoritos()} 
        className="card-item__imgee" 
        src={plusIcon} 
        alt={plusIcon}
         /> */}
    
    </div>
  </div>
  
)}





//<div>
//         <img src={image}/>
//     <div>
//         <div>

//         </div>
//         <h4 >{name}</h4>
//         <div className="genres">
//             {genres.map((g)=>(
//                 <span key={g.id}>{g.name}</span>
//                 ))}
//      </div>
// )  </div>
//}

