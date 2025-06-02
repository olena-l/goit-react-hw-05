import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

export default function HomePage({ fetchTrendingMovies }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrendingMovies()
      .then(setMovies)
      .catch(() => setError('Failed to load trending movies'));
  }, [fetchTrendingMovies]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
}
