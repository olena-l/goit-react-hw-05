import { Link, useLocation } from 'react-router-dom';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const location = useLocation();
  const from = location.pathname + location.search;

  return (
    <div className={styles.card}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/200x300?text=No+Image'
        }
        alt={movie.title}
        className={styles.image}
      />
      <h3 className={styles.title}>{movie.title}</h3>
      <Link to={`/movies/${movie.id}`} state={{ from }} className={styles.link}>
        More Info
      </Link>
    </div>
  );
};

export default MovieCard;
