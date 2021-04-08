import React from 'react'
import Movie from '../Components/Movie'

const MovieList = (props) => {
    return(
        <div className='movie-container'>
            {props.movies.map(movie => {
                if (movie.shownCategories > 0){
                    return <Movie key={movie.title} movie={movie} type={props.type} checked={props.checked.filter(check => check.id === movie.id)[0].checked} checkMovie={props.checkMovie}/>
                } else {
                    return <></>
                } 
            }
            )}
        </div>
    )
}

export default MovieList