import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { MovieDetailsProps } from "../types/interfaces";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();

  const {
    data: movie,
    error,
    isPending,
    isError,
  } = useQuery<MovieDetailsProps, Error>({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id || ""),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails {...movie} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
