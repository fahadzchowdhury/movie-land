import { useState } from "react";
import { useEffect } from "react";
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';
const api_url = 'http://www.omdbapi.com/?apikey=119a18b0';


const App = () =>  {
  const [movies, setMovies] = useState([]);
  const [searchBar, setSearchBar] = useState();

  const searchMovies = async (title) => {
    const response = await fetch(`${api_url}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('batman');
  }, []);  
  return (
    <div className="App">
      
      <h1>MovieLand</h1>

      <div className="search">
        <input type="text" placeholder="Search for a movie" value={searchBar} onChange={(e)=>{setSearchBar(e.target.value)}} />
        <img src={SearchIcon} alt="search" onClick={()=>searchMovies(searchBar)}/>
      </div>

      {
        movies?.length > 0
        ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>    
        )
        : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
        )
      }
    </div>
  );
}

export default App;
