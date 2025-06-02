import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './HomePage.module.css';

export default function HomePage({ fetchTrendingMovies }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchTrendingMovies()
      .then(setMovies)
      .catch(() => setError('Failed to load trending movies'));
  }, [fetchTrendingMovies]);

  if (error) {
    return <p>{error}</p>;
  }
  
  const from = location.pathname + location.search;

  return (
    <div className={styles.container}>
      <h1>Trending Today</h1>
      <ul className={styles.list}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.item}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from }}
              className={styles.link}
            >
              {movie.title || movie.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
