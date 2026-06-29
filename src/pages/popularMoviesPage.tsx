import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getPopularMovies } from "../api/tmdb-api";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import PlaylistAdd from "../components/cardIcons/playlistAdd";

const PopularMoviesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    "popular",
    getPopularMovies
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  return (
    <PageTemplate
      title="Popular Movies"
      movies={movies}
      action={(movie: BaseMovieProps) => {
        return (
          <>
            <AddToFavouritesIcon {...movie} />
            <PlaylistAdd {...movie} />
          </>
        );
      }}
    />
  );
};

export default PopularMoviesPage;