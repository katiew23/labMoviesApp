import type { Meta, StoryObj } from '@storybook/react';
import TVSeriesCard from "../components/tvSeriesCard";
import { SampleTVSeries } from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import AddToFavouritesTVSeriesIcon from "../components/cardIcons/addToFavouritesTVSeries";
//import React from 'react';

const meta = {
  title: 'TV Series Page/TVSeriesCard',
  component: TVSeriesCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
} satisfies Meta<typeof TVSeriesCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (tvSeries) => <AddToFavouritesTVSeriesIcon {...tvSeries} />,
    series: SampleTVSeries,
  }
};

Basic.storyName = "Default";

const sampleNoPoster = { ...SampleTVSeries, poster_path: "" };

export const Exceptional: Story = {
  args: {
    series: sampleNoPoster,
    action: (tvSeries) => <AddToFavouritesTVSeriesIcon {...tvSeries} />,
  }
};

Exceptional.storyName = "Exception";