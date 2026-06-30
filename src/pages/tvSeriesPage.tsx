import React from "react";
import { useQuery } from "react-query";
import { getTVSeries } from "../api/tmdb-api";
import { BaseTVProps, DiscoverTV } from "../types/interfaces";
import Spinner from "../components/spinner";
import TVSeriesCard from "../components/tvSeriesCard";
import Grid from "@mui/material/Grid";

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

      <Grid container spacing={5} style={{ padding: "15px" }}>
        {tvSeries.map((series) => (
          <Grid key={series.id} item xs={12} sm={6} md={4} lg={3}>
            <TVSeriesCard
              series={series}
              action={(series: BaseTVProps) => {
                return null;
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TVSeriesPage;