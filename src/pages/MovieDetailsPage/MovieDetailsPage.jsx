import { useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = ({
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
}) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const backLink = location.state?.from ?? '/movies';

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Failed to load movie details:', error);
      }
    };
    loadMovie();
  }, [movieId, fetchMovieDetails]);

  if (!movie) return <p>Loading movie...</p>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(backLink)} className={styles.backButton}>
        Go back
      </button>

      <div className={styles.details}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : 'https://placehold.co/300x450?text=No+Image'
          }
          alt={movie.title}
        />

        <div className={styles.info}>
          <h2>{movie.title}</h2>
          <p>
            <strong>User Score:</strong> {Math.round(movie.vote_average * 10)}%
          </p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <div className={styles.links}>
        <p>Additional information:</p>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`} state={{ from: backLink }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`} state={{ from: backLink }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Routes>
        <Route
          path="cast"
          element={<MovieCast fetchMovieCast={fetchMovieCast} />}
        />
        <Route
          path="reviews"
          element={<MovieReviews fetchMovieReviews={fetchMovieReviews} />}
        />
      </Routes>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
