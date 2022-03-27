import VideogameCard from "../VideogameCard/videogameCard"


export const VideogamesCards = ({allVideogames}) => {
    return (
      
        allVideogames?.map(g => {
            console.log("paraemi" , allVideogames)
            return (
                    <VideogameCard
                            key={g.id}
                            id={g.id}
                            name={g.name}
                            image={g.image}
                            genres={g.genres}
                            rating={g.rating}
                        
                            />
            )
        })
    )
}