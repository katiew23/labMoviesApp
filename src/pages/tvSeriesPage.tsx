import React from "react";
import { useQuery } from "react-query";
import { getTVSeries } from "../api/tmdb-api";
import { DiscoverTV } from "../types/interfaces";
import Spinner from "../components/spinner";

const TVSeriesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverTV, Error>(
    "tvSeries",
    getTVSeries
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tvSeries = data ? data.results : [];

  return (
    <>
      <h1>Popular TV Series</h1>
      <ul>
        {tvSeries.map((series) => (
          <li key={series.id}>
            {series.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TVSeriesPage;