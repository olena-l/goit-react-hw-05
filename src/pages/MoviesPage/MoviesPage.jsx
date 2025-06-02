import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = ({ searchMovies }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setNotFound(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const results = await searchMovies(query);
        setMovies(results);
        setError(null);
        setNotFound(results.length === 0);
      } catch (error) {
        console.error(error);
        setError('Failed to load movies.');
        setNotFound(false);
      }
    };

    fetchResults();
  }, [query, searchMovies]);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const value = form.elements.query.value.trim();

    if (!value) return;

    try {
      const results = await searchMovies(value);
      setMovies(results);
      setSearchParams({ query: value });
      setError(null);
      setNotFound(results.length === 0);
    } catch (error) {
      console.error(error);
      setError('Search failed.');
      setNotFound(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          className={styles.input}
          placeholder="Search movies..."
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && notFound && <p>No movies found for "{query}".</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
