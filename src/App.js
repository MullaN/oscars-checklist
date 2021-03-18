import './App.css';
import AllMovies from './Containers/AllMovies';

function App() {
  return (
    <div className="App">
      <h1>Oscars Checklist</h1>
      <h2>Feature Films</h2>
      <AllMovies type='movies'/>
      <h2>Short Films</h2>
      <AllMovies type='shorts'/>
    </div>
  );
}

export default App;
