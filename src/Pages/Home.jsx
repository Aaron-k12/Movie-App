import React from 'react';
import Header from '../Components/Header/Header';
import SearchBar from '../Components/SearchBar/SearchBar';
import Main from '../Components/Main/Main';
import NotFound from '../Components/NotFound/NotFound';
import Watchlist from './Watchlist';
import { ClipLoader } from 'react-spinners';

const Home = () => {
  const [isHome, setIsHome] = React.useState(true);
  const [movieName, setMovieName] = React.useState(null);
  const [movieData, setMovieData] = React.useState([]);
  const [allMovieData, setAllMovieData] = React.useState([]);
  const [notFound, setNotFound] = React.useState(false);
  const [renderWatchlist, setRenderWatchlist] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [storedMovies, setStoredMovies] = React.useState(() => {
    return JSON.parse(localStorage.getItem('movies')) || [];
  });

  //API key
  const apikey = import.meta.env.VITE_REACT_API_KEY;

  // stored movies
  const addMovieToWatchlist = (movie) => {
    // filter movie array
    const data = {
      Poster: movie.Poster,
      Title: movie.Title,
      imdbID: movie.imdbID,
      imdbRating: movie.imdbRating,
      Runtime: movie.Runtime,
      Plot: movie.Plot,
      Genre: movie.Genre,
      added: true,
    };
    setStoredMovies((prev) => {
      const isExist = prev
        ? prev.some((eachMovie) => eachMovie.imdbID === data.imdbID)
        : 'undefined';
      if (!isExist) {
        return [data, ...prev];
      }
      return prev;
    });
  };

  // add movies to local storage
  React.useEffect(() => {
    if (storedMovies) {
      localStorage.setItem('movies', JSON.stringify(storedMovies));
    }
  }, [storedMovies]);

  // getting all movies by name
  React.useEffect(() => {
    const fetchData = async () => {
      if (movieName) {
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${apikey}&s=${movieName}`,
          );
          const result = await response.json();
          setMovieData(result.Search.map((item) => item.Title));
          setNotFound(false);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          setNotFound(true);
        }
      }
    };
    fetchData();
  }, [movieName]);

  // get movie by title
  React.useEffect(() => {
    const getAllMovieDetails = async () => {
      let allData = [];

      for (let eachMovie of movieData) {
        try {
          const responses = await fetch(
            `https://www.omdbapi.com/?apikey=${apikey}&t=${eachMovie}`,
          );
          const result = await responses.json();

          const isExist = allData
            ? allData.some((eachMovie) => eachMovie.imdbID === result.imdbID)
            : null;

          if (!result.Error && !isExist) {
            allData.push(result);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setAllMovieData(allData);
    };
    if (movieData) {
      getAllMovieDetails();
    }
  }, [movieData]);

  // Function to delete movie
  const deleteMovie = (movie) => {
    setStoredMovies((prev) =>
      prev.filter((item) => item.imdbID !== movie.imdbID),
    );
  };

  // function to render watchlist
  const handleRenderWatchlist = () => {
    setRenderWatchlist((prev) => !prev);
    setIsHome((prev) => !prev);
  };

  const override = {
    position: 'fixed',
    height: '100px',
    width: '100px',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '50px',
  };

  return (
    <>
      <Header
        handleClick={handleRenderWatchlist}
        setIsHome={setIsHome}
        isHome={isHome}
      />
      {!renderWatchlist && (
        <SearchBar setMovieName={setMovieName} setLoading={setLoading} />
      )}
      {renderWatchlist ? (
        <Watchlist
          movies={storedMovies}
          deleteMovie={deleteMovie}
          renderHome={handleRenderWatchlist}
        />
      ) : (
        <>
          {
            <ClipLoader
              size={150}
              loading={loading}
              color={'yellow'}
              aria-label="Loading Spinner"
              cssOverride={override}
            />
          }
          {notFound ? (
            <NotFound />
          ) : (
            <Main movies={allMovieData} handleClick={addMovieToWatchlist} />
          )}
        </>
      )}
    </>
  );
};

export default Home;
