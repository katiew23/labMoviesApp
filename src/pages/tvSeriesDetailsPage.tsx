import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getTVSeriesDetails } from "../api/tmdb-api";
import { TVDetailsProps } from "../types/interfaces";
import Spinner from "../components/spinner";

const TVSeriesDetailsPage: React.FC = () => {
  const { id } = useParams();

  const { data: series, error, isLoading, isError } = useQuery<TVDetailsProps, Error>(
    ["tvSeries", id],
    () => getTVSeriesDetails(id || "")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {series ? (
        <>
          <h1>{series.name}</h1>
          <p>{series.tagline}</p>
          <p>{series.overview}</p>
          <p>First Air Date: {series.first_air_date}</p>
          <p>Status: {series.status}</p>
          <p>Seasons: {series.number_of_seasons}</p>
          <p>Episodes: {series.number_of_episodes}</p>
          <p>Rating: {series.vote_average}</p>

          <h3>Genres</h3>
          <ul>
            {series.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Waiting for TV series details</p>
      )}
    </>
  );
};

export default TVSeriesDetailsPage;