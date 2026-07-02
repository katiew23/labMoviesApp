import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTVSeries } from "../api/tmdb-api";
import { BaseTVProps, DiscoverTV } from "../types/interfaces";
import Spinner from "../components/spinner";
import TVSeriesCard from "../components/tvSeriesCard";
import Grid from "@mui/material/Grid";
import { MoviesContext } from "../contexts/moviesContext";
import RemoveFromFavouritesTVSeries from "../components/cardIcons/removeFromFavouritesTVSeries";

const FavouriteTVSeriesPage: React.FC = () => {
  const { favouriteTVSeries } = useContext(MoviesContext);

  const { data, error, isPending, isError } = useQuery<DiscoverTV, Error>({
    queryKey: ["tvSeries"],
    queryFn: () => getTVSeries(),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tvSeries = data ? data.results : [];

  const displayedTVSeries = tvSeries.filter((series) =>
    favouriteTVSeries.includes(series.id)
  );

  return (
    <>
      <h1>Favourite TV Series</h1>

      <Grid container spacing={5} style={{ padding: "15px" }}>
        {displayedTVSeries.map((series) => (
          <Grid key={series.id} item xs={12} sm={6} md={4} lg={3}>
            <TVSeriesCard
              series={series}
              action={(series: BaseTVProps) => {
                return <RemoveFromFavouritesTVSeries {...series} />;
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FavouriteTVSeriesPage;