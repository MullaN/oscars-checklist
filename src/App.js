import { Component } from 'react';
import './App.css';
import MovieList from './Containers/MovieList';
import Countdown from './Components/Countdown'

class App extends Component {
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

  render(){
    return (
      <div className="App">
        <h1>2021 OSCARS Checklist</h1>
        <Countdown />
        <h2>Feature Films</h2>
        <MovieList checkMovie={this.checkMovie} movies={this.state.movies} checked={this.state.moviesChecked} type='movies'/>
        <h2>Short Films</h2>
        <MovieList checkMovie={this.checkMovie} movies={this.state.shorts} checked={this.state.shortsChecked} type='shorts'/>
      </div>
    )
  }
}

export default App;
