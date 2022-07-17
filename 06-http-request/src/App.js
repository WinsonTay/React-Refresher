import React , {useState , useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading,setIsLoading] = useState(false)

 
  const fetchMovies = useCallback(async () => {
    setIsLoading(true)
    let response = await fetch("https://swapi.dev/api/films/")
    let data = await response.json();
    setMovies(data.results.map(movie => {
        return {
          title:movie.title,
          id:movie.episode_id,
          openingText:movie.opening_crawl,
          releaseDate:movie.release_date
        }
    }))
    setIsLoading(false)
  },[]);

  useEffect(()=> {
    fetchMovies()
  }, [fetchMovies])


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
       {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
       {!isLoading && movies.length === 0 && <p>No Movies found</p> }
       { isLoading && <p>Loading..</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
