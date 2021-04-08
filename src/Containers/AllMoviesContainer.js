import React, {Component} from 'react'
import MovieList from './MovieList';
import history from '../history';
import Savebox from '../Components/Savebox'
import FilterBox from '../Components/FilterBox'

class AllMoviesContainer extends Component {
    state = {
        movies: [],
        shorts: [],
        moviesChecked: [],
        shortsChecked: [],
        categories: {},
        recentSave: false,
        saveId: (this.props.match ? this.props.match.params.id : '')
      }
    
    componentDidMount(){
        Promise.all([fetch('https://oscars-checklist-backend.herokuapp.com/api/movies'), fetch('https://oscars-checklist-backend.herokuapp.com/api/shorts')])
        .then(([resp1, resp2]) => {
            return Promise.all([resp1.json(), resp2.json()])
        })
        .then(([movies, shorts]) => {
            this.setupMovie(movies, 'movies')
            this.setupMovie(shorts, 'shorts')
            let categories = {}
            movies.forEach(movie => {
                movie.nominations.forEach(nom => {
                    if (!(nom.category in categories)){
                        categories[nom.category] = {checked: true, movies: [movie.title]}
                    } else {
                        categories[nom.category].movies.push(movie.title)
                    }
                })
            })
            shorts.forEach(short => {
                short.nominations.forEach(nom => {
                    if (!(nom.category in categories)){
                        categories[nom.category] = {checked: true, movies: [short.title]}
                    } else {
                        categories[nom.category].movies.push(short.title)
                    }
                })
            })
            this.setState({categories})
        })
        .then(() => {
            if (this.props.match && this.props.match.params.id) {
                fetch(`https://oscars-checklist-backend.herokuapp.com/api/saved/${this.props.match.params.id}`)
                .then(resp => resp.json())
                .then(data => this.setState({moviesChecked: data.movies, shortsChecked: data.shorts}))
            }
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
        data = data.map(d => ({...d, shownCategories: d.nominations.length}))
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
        let tempChecked = [...this.state[`${type}Checked`]]
        let findCheck = tempChecked.filter(check => check.id === id)[0]
        findCheck.checked = !findCheck.checked
        this.setState({[`${type}Checked`]: tempChecked})
        if (this.state.saveId !== '') {
            fetch(`https://oscars-checklist-backend.herokuapp.com/api/saved/${this.state.saveId}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({movies: this.state.moviesChecked, shorts: this.state.shortsChecked})
            })
        }
    }

    checkFilter = (category) => {
        let tempCategories = {...this.state.categories}
        let foundCategory = tempCategories[category]
        let moviesOrShorts = category.includes('Short') ? 'shorts' : 'movies'
        let tempMovies = [...this.state[moviesOrShorts]]
        let tempMovie
        if (foundCategory.checked) {
            foundCategory.movies.forEach(movie => {
                tempMovie = tempMovies.filter(m => m.title === movie)[0]
                tempMovie.shownCategories--
            })
        } else {
            foundCategory.movies.forEach(movie => {
                tempMovie = tempMovies.filter(m => m.title === movie)[0]
                tempMovie.shownCategories++
            })
        }
        foundCategory.checked = !foundCategory.checked
        this.setState({[moviesOrShorts]: tempMovies, categories: tempCategories})
    }

    saveList = () => {
        fetch('https://oscars-checklist-backend.herokuapp.com/api/saved', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({movies: this.state.moviesChecked, shorts: this.state.shortsChecked})
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({saveId: data['_id'], recentSave: true})
        })
    }

    filterAllBehavior = (clear) => {
        let movies = [...this.state.movies]
        let shorts = [...this.state.shorts]
        let categories = {...this.state.categories}
        movies.forEach(movie => movie.shownCategories = clear ? 0 : movie.nominations.length)
        shorts.forEach(movie => movie.shownCategories = clear ? 0 : movie.nominations.length)
        Object.keys(categories).forEach(category => categories[category].checked = clear ? false : true)
        this.setState({movies, shorts, categories})
    }

    render(){
        if (this.state.saveId !== "" && !this.props.match){
            history.push(`/${this.state.saveId}`)
        }
        return ( 
            <>
                <FilterBox categories={this.state.categories} checkFilter={this.checkFilter} filterAllBehavior={this.filterAllBehavior}/>
                {this.state.movies.filter(movie => movie.shownCategories > 0).length > 0 ? 
                <>
                    <h2>Feature Films</h2>
                    <MovieList checkMovie={this.checkMovie} movies={this.state.movies} checked={this.state.moviesChecked} type='movies'/>
                </>
                :
                <>
                </>
                }
                {this.state.shorts.filter(movie => movie.shownCategories > 0).length > 0 ? 
                <>
                    <h2>Short Films</h2>
                    <MovieList checkMovie={this.checkMovie} movies={this.state.shorts} checked={this.state.shortsChecked} type='shorts'/>
                </>
                :
                <>
                </>
                }
                <div className='bottom-spacing'></div>
                {this.state.saveId === '' || this.state.recentSave ? <Savebox recentSave={this.state.recentSave} saveList={this.saveList} saveId={this.state.saveId}/> : <></>}
            </>
        )
    }
}

export default AllMoviesContainer