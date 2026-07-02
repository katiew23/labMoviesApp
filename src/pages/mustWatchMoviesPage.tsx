import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovie } from "../api/tmdb-api";
import { BaseMovieProps, MovieDetailsProps } from "../types/interfaces";
import { useQueries } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";

const MustWatchMoviesPage: React.FC = () => {
  const { mustWatch } = useContext(MoviesContext);

 const mustWatchMovieQueries = useQueries({
  queries: mustWatch.map((movieId) => {
    return {
      queryKey: ["movie", movieId],
      queryFn: () => getMovie(movieId.toString()),
    };
  }),
});

  const isPending = mustWatchMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = mustWatchMovieQueries
  .map((q) => q.data)
  .filter((movie): movie is MovieDetailsProps => movie !== undefined);

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