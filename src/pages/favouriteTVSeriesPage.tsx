import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTVSeries } from "../api/tmdb-api";
import { BaseTVProps, DiscoverTV } from "../types/interfaces";
import Spinner from "../components/spinner";
import TVSeriesCard from "../components/tvSeriesCard";
import Grid from "@mui/material/Grid";
import { MoviesContext } from "../contexts/moviesContext";
import RemoveFromFavouritesTVSeries from "../components/cardIcons/removeFromFavouritesTVSeries";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";


const FavouriteTVSeriesPage: React.FC = () => {
  const { favouriteTVSeries, reorderFavouriteTVSeries } = useContext(MoviesContext);

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

  const displayedTVSeries = favouriteTVSeries
  .map((tvId) => tvSeries.find((series) => series.id === tvId))
  .filter((series): series is BaseTVProps => series !== undefined);

  const moveTVSeries = async (
  tvId: number,
  direction: "up" | "down"
) => {
  const currentIndex = favouriteTVSeries.indexOf(tvId);

  if (currentIndex === -1) return;

  const newIndex =
    direction === "up"
      ? currentIndex - 1
      : currentIndex + 1;

  if (
    newIndex < 0 ||
    newIndex >= favouriteTVSeries.length
  ) {
    return;
  }

  const newOrder = [...favouriteTVSeries];

  [newOrder[currentIndex], newOrder[newIndex]] = [
    newOrder[newIndex],
    newOrder[currentIndex],
  ];

  await reorderFavouriteTVSeries(newOrder);
};

  return (
    <>
      <h1>Favourite TV Series</h1>

      <Grid container spacing={5} style={{ padding: "15px" }}>
        {displayedTVSeries.map((series) => (
          <Grid key={series.id} item xs={12} sm={6} md={4} lg={3}>
            <TVSeriesCard
              series={series}
              action={(series: BaseTVProps) => {
                return (
                  <>
                    <IconButton
                      onClick={() => moveTVSeries(series.id, "up")}
                      disabled={favouriteTVSeries.indexOf(series.id) === 0}
                    >
                      <ArrowUpwardIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => moveTVSeries(series.id, "down")}
                      disabled={
                        favouriteTVSeries.indexOf(series.id) === favouriteTVSeries.length - 1
                      }
                    >
                      <ArrowDownwardIcon />
                    </IconButton>

                    <RemoveFromFavouritesTVSeries {...series} />
                  </>
                );
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FavouriteTVSeriesPage;