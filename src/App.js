import { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Countdown from './Components/Countdown'
import AllMoviesContainer from './Containers/AllMoviesContainer';

class App extends Component {

  render(){
    console.log(this.props)
    return (
      <div className="App">
        <h1>2021 OSCARS Checklist</h1>
        <Countdown />
        <Router>
            <Route path='/' exact component={() => <AllMoviesContainer />} />
            <Route path='/:id' component={AllMoviesContainer} />
        </Router>
      </div>
    )
  }
}

export default App;
