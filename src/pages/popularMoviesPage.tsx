import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getPopularMovies } from "../api/tmdb-api";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import PlaylistAdd from "../components/cardIcons/playlistAdd";
import Button from "@mui/material/Button";

const PopularMoviesPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const {
    data,
    error,
    isPending,
    isError,
    isFetching,
    isPlaceholderData,
  } = useQuery<DiscoverMovies, Error>({
    queryKey: ["popular", page],
    queryFn: () => getPopularMovies(page),
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];

  return (
    <>
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

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          margin: "20px",
        }}
      >
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() => setPage((oldPage) => Math.max(oldPage - 1, 1))}
        >
          Previous
        </Button>

        <span>
          Page {page} of {data?.total_pages}
        </span>

        <Button
          variant="contained"
          disabled={isPlaceholderData || page >= (data?.total_pages ?? page)}
          onClick={() => setPage((oldPage) => oldPage + 1)}
        >
          Next
        </Button>

        {isFetching && <span>Loading...</span>}
      </div>
    </>
  );
};

export default PopularMoviesPage;