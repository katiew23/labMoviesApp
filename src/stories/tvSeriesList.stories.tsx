import type { Meta } from '@storybook/react';
import TVSeriesCard from "../components/tvSeriesCard";
import { SampleTVSeries } from "./sampleData";
import { MemoryRouter } from "react-router";
import AddToFavouritesTVSeriesIcon from "../components/cardIcons/addToFavouritesTVSeries";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";

const meta = {
  title: "TV Series Page/TVSeriesList",
  component: TVSeriesCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    (Story) => <MoviesContextProvider><Story /></MoviesContextProvider>,
  ],
} satisfies Meta<typeof TVSeriesCard>;

export default meta;

export const Basic = () => {
  const tvSeries = [
    { ...SampleTVSeries, id: 1 },
    { ...SampleTVSeries, id: 2 },
    { ...SampleTVSeries, id: 3 },
    { ...SampleTVSeries, id: 4 },
    { ...SampleTVSeries, id: 5 },
  ];

  return (
    <Grid container spacing={5}>
      {tvSeries.map((series) => (
        <Grid item key={series.id}>
          <TVSeriesCard
            series={series}
            action={(series) => <AddToFavouritesTVSeriesIcon {...series} />}
          />
        </Grid>
      ))}
    </Grid>
  );
};

Basic.storyName = "Default";