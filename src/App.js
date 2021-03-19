import './App.css';
import MovieList from './Containers/MovieList';

function App() {
  return (
    <div className="App">
      <h1>2021 Oscars Checklist</h1>
      <h2>Feature Films</h2>
      <MovieList type='movies'/>
      <h2>Short Films</h2>
      <MovieList type='shorts'/>
    </div>
  );
}

export default App;
