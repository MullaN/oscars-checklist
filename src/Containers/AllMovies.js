import React, { Component } from 'react'
import Movie from '../Components/Movie'

class AllMovies extends Component {
    state = {
        movies: []
    }

    componentDidMount(){
        fetch(`http://192.168.50.119:5000/api/${this.props.type}`)
        .then(res => res.json())
        .then(movies => {
            movies = movies.sort((a,b) => {
                let editedA = a.title.replace('The ','')
                let editedB = b.title.replace('The ','')
                console.log(editedA, editedB)
                if(editedA < editedB) { return -1; }
                if(editedA > editedB) { return 1; }
                return 0;
            })
            this.setState({movies})
        })
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