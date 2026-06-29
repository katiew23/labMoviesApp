import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovie } from "../api/tmdb-api";
import { BaseMovieProps, MovieDetailsProps } from "../types/interfaces";
import { useQueries } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";

const MustWatchMoviesPage: React.FC = () => {
  const { mustWatch } = useContext(MoviesContext);

  const mustWatchMovieQueries = useQueries(
    mustWatch.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  const isLoading = mustWatchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = mustWatchMovieQueries.map((q) => q.data) as MovieDetailsProps[];

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={movies}
      action={(movie: BaseMovieProps) => {
        return (
          <>
            <AddToFavouritesIcon {...movie} />
            <RemoveFromMustWatch {...movie} />
          </>
        );
      }}
    />
  );
};

export default MustWatchMoviesPage;