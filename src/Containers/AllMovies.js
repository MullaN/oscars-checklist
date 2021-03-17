import React, { Component } from 'react'
import Movie from '../Components/Movie'

class AllMovies extends Component {
    state = {
        movies: []
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/movies')
        .then(res => res.json())
        .then(movies => this.setState({movies}))
    }

    render(){
        return(
            <div className='movie-container'>
                {this.state.movies.map(movie => <Movie movie={movie} />)}
            </div>
        )
    }
}

export default AllMovies