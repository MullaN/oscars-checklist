import React, {Component} from 'react'
import MovieList from './MovieList';

class AllMoviesContainer extends Component {
    state = {
        movies: [],
        shorts: [],
        moviesChecked: [],
        shortsChecked: []
      }
    
      componentDidMount(){
        Promise.all([fetch('http://192.168.50.119:5000/api/movies'), fetch('http://192.168.50.119:5000/api/shorts')])
        .then(([resp1, resp2]) => {
          return Promise.all([resp1.json(), resp2.json()])
        })
        .then(([movies, shorts]) => {
          this.setupMovie(movies, 'movies')
          this.setupMovie(shorts, 'shorts')
        })
      }
    
      setupMovie(data, type){
        data = data.sort((a,b) => {
          let editedA = a.title.replace('The ','')
          let editedB = b.title.replace('The ','')
          if(editedA < editedB) { return -1; }
          if(editedA > editedB) { return 1; }
          return 0;
        })
        let checked = data.map(movie => {
            let checkedObj = {
              'id': movie.id,
              'checked': false
            }
            return(checkedObj)
        })
        this.setState({[`${type}Checked`]: checked})
        this.setState({[`${type}`]: data})
      }
    
      checkMovie = (id, type) => {
        let tempChecked = this.state[`${type}Checked`]
        let findCheck = tempChecked.filter(check => check.id === id)[0]
        findCheck.checked = !findCheck.checked
        this.setState({[`${type}Checked`]: tempChecked, recentSave: false})
      }
    
      saveList = () => {
        fetch('http://192.168.50.119:5000/api/saved', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({movies: this.state.moviesChecked, shorts: this.state.shortsChecked})
        })
        .then(resp => resp.json())
        .then(data => {
          this.setState({recentSave: true})
        })
      }

    render(){
        return (
            <>
                <button onClick={this.saveList}>Save List</button>
                <h2>Feature Films</h2>
                <MovieList checkMovie={this.checkMovie} movies={this.state.movies} checked={this.state.moviesChecked} type='movies'/>
                <h2>Short Films</h2>
                <MovieList checkMovie={this.checkMovie} movies={this.state.shorts} checked={this.state.shortsChecked} type='shorts'/>
            </>
        )
    }
}

export default AllMoviesContainer