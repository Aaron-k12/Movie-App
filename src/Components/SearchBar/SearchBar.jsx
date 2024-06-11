import React from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ setMovieName }) => {
  const [movieData, setMovieData] = React.useState('');

  const handleClick = (e) => {
    e.preventDefault();
    setMovieName(movieData);
    setMovieData('');
  };

  return (
    <div className="search-bar">
      <form>
        <FaSearch color={'#A5A5A5'} />
        <input
          id="search-input"
          type="text"
          placeholder="Avengers"
          value={movieData}
          onChange={(e) => setMovieData(e.target.value)}
        />
        <button className="submit-btn" type="submit" onClick={handleClick}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
