import React from 'react';
import './Header.css';

const Header = ({ handleClick, setIsHome, isHome }) => {
  return (
    <header className="header-section">
      <div className="header">
        <h1>Film</h1>
        <button className="hover" onClick={() => handleClick()}>
          {isHome ? 'My Watchlist' : 'Search Movies'}
        </button>
      </div>
      <div className="movie-logo">
        <img
          src="images\movie-logo.png"
          alt="movie_logo"
          className="movie-logo"
        />
      </div>
    </header>
  );
};

export default Header;
