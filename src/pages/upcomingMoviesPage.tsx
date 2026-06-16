import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import MovieList from "../components/movieList";
import { getUpcomingMovies } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces";


const UpcomingMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie: BaseMovieProps) => {
        return <AddToFavoritesIcon {...movie} />;
      }}
    >
      <MovieList movies={movies} />
    </PageTemplate>
  );
};

export default UpcomingMoviesPage;