import React from 'react';
import Main from '../Components/Main/Main';
import { FaCirclePlus } from 'react-icons/fa6';

const Watchlist = ({ movies, deleteMovie, renderHome }) => {
  const emptyWatchlistFunction = !movies.length ? (
    <div className="small-text">
      <p>Your watchlist is empty...</p>
      <button onClick={renderHome} className="home-btn">
        <FaCirclePlus />
        Click here to start
      </button>
    </div>
  ) : null;

  return (
    <>
      <Main movies={movies} handleClick={deleteMovie} />
      {emptyWatchlistFunction}
    </>
  );
};

export default Watchlist;
