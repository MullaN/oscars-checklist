import { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import history from './history';
import './App.css';
import Countdown from './Components/Countdown'
import AllMoviesContainer from './Containers/AllMoviesContainer';

class App extends Component {

  render(){
    return (
      <div className="App">
        <h1>2022 OSCARS CHECKLIST</h1>
        <Countdown />
        <Router history={history}>
            <Route path='/' exact component={() => <AllMoviesContainer />} />
            <Route path='/:id' component={AllMoviesContainer} />
        </Router>
      </div>
    )
  }
}

export default App;
