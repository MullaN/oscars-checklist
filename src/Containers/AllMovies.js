import React, { Component } from 'react'
import Movie from '../Components/Movie'

class AllMovies extends Component {
    state = {
        movies: [],
        checked: []
    }

    componentDidMount(){
        fetch(`http://192.168.50.119:5000/api/${this.props.type}`)
        .then(res => res.json())
        .then(movies => {
            movies = movies.sort((a,b) => {
                let editedA = a.title.replace('The ','')
                let editedB = b.title.replace('The ','')
                if(editedA < editedB) { return -1; }
                if(editedA > editedB) { return 1; }
                return 0;
            })
            let checked = movies.map(movie => {
                let checkedObj = {
                    'id': movie.id,
                    'checked': false
                }
                return(checkedObj)
            })
            this.setState({checked})
            this.setState({movies})
        })
    }

    checkMovie = (id) => {
        let tempChecked = this.state.checked
        let findCheck = tempChecked.filter(check => check.id === id)[0]
        findCheck.checked = true
        this.setState({checked: tempChecked})
    }

    render(){
        return(
            <div className='movie-container'>
                {this.state.movies.map(movie => <Movie movie={movie} checked={this.state.checked.filter(check => check.id === movie.id)[0].checked} checkMovie={this.checkMovie}/>)}
            </div>
        )
    }
}

export default AllMovies