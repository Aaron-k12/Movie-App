import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { FaCircleMinus } from 'react-icons/fa6';
import './Main.css';

const Main = ({ movies, handleClick }) => {
  // state to track expanded movie
  const [expandedMovie, setExpandedMovie] = React.useState('');
  // state to track if the movie read more button should be used
  const [showReadMoreBtn, setShowReadMoreBtn] = React.useState({});
  // state to track window size
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  const refs = React.useRef({});

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize]);

  React.useEffect(() => {
    const newShowReadMore = {};
    movies.forEach((movie) => {
      // check scroll height and client height of each movie's description
      if (
        refs.current[movie.imdbID] &&
        refs.current[movie.imdbID].scrollHeight !==
          refs.current[movie.imdbID].clientHeight
      ) {
        newShowReadMore[movie.imdbID] = true;
      }
    });
    setShowReadMoreBtn(newShowReadMore);
  }, [movies, windowSize]);

  const handleToggle = (id) => {
    setExpandedMovie((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMovies = movies
    ? movies.map((item, index) => {
        const isExpanded = expandedMovie[item.imdbID];
        return (
          <div className="movie-list" key={item.imdbID}>
            <img
              src={item.Poster}
              alt={`logo of ${item.Title}`}
              className="movie-poster"
            />
            <div className="movie-details">
              <div className="movie-details-heading flex">
                <h1>{item.Title}</h1>
                <div className="movie-ratings flex">
                  {<FaStar color={'#FEC654'} />}
                  <p>{item.imdbRating}</p>
                </div>
              </div>
              <div className="movie-details-body flex">
                <p>{item.Runtime}</p>
                <p>{item.Genre}</p>
                <button
                  className={`watchlist-btn flex ${
                    !item.added ? 'add-status' : 'remove-status'
                  }`}
                  onClick={() => handleClick(item)}
                >
                  {!item.added ? (
                    <>
                      <FaCirclePlus />
                      <span> Watchlist </span>
                    </>
                  ) : (
                    <>
                      <FaCircleMinus />
                      <span>Remove</span>
                    </>
                  )}
                </button>
              </div>
              <p
                className={`movie-details-plot ${
                  !isExpanded ? 'hide-text' : null
                }`}
                id={`plot-${item.imdbID}`}
                ref={(el) => (refs.current[item.imdbID] = el)}
              >
                {item.Plot}
              </p>
              {showReadMoreBtn[item.imdbID] ? (
                <button
                  className="readmore-btn"
                  onClick={() => handleToggle(item.imdbID)}
                >
                  {isExpanded ? 'read less' : 'read more'}...
                </button>
              ) : null}
            </div>
          </div>
        );
      })
    : null;

  return (
    <div className="movie-list-wrapper" style={{ color: 'white' }}>
      {renderMovies}
    </div>
  );
};

export default Main;
