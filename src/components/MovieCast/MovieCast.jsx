import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';

const MovieCast = ({ fetchMovieCast }) => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCast = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        console.error('Failed to load cast:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCast();
  }, [movieId, fetchMovieCast]);

  if (isLoading) return <p>Loading cast...</p>;

  if (cast.length === 0) return <p>No cast info available.</p>;

  return (
    <ul className={styles.list}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={styles.item}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : 'https://placehold.co/100x150?text=No+Image'
            }
            alt={name}
          />
          <p>
            <strong>{name}</strong>
          </p>
          <p>as {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
