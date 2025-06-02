import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieReviews.module.css';

const MovieReviews = ({ fetchMovieReviews }) => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error('Failed to load reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [movieId, fetchMovieReviews]);

  if (isLoading) return <p>Loading reviews...</p>;

  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <ul className={styles.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={styles.item}>
          <p>
            <strong>{author}</strong>:
          </p>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
