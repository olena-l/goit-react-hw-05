import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Navigation from './components/Navigation/Navigation';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const API_KEY = '508a24d8ff444c4ae069e6feef1a68bd';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchTrendingMovies = async () => {
  const res = await axios.get(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );
  return res.data.results;
};

const searchMovies = async query => {
  const res = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`
  );
  return res.data.results;
};

const fetchMovieDetails = async id => {
  const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return res.data;
};

const fetchMovieCast = async id => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
  );
  return res.data.cast;
};

const fetchMovieReviews = async id => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`
  );
  return res.data.results;
};

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<HomePage fetchTrendingMovies={fetchTrendingMovies} />}
          />
          <Route
            path="/movies"
            element={<MoviesPage searchMovies={searchMovies} />}
          />
          <Route
            path="/movies/:movieId/*"
            element={
              <MovieDetailsPage
                fetchMovieDetails={fetchMovieDetails}
                fetchMovieCast={fetchMovieCast}
                fetchMovieReviews={fetchMovieReviews}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
