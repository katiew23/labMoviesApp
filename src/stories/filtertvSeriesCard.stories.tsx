import type { Meta, StoryObj } from '@storybook/react';
import FilterTVSeriesCard from "../components/filterTVSeriesCard";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const meta = {
  title: 'TV Series/FilterTVSeriesCard',
  component: FilterTVSeriesCard,
  decorators: [
    (Story: React.FC) => <MemoryRouter initialEntries={["/tv-series"]}><Story /></MemoryRouter>,
    (Story: React.FC) => (<QueryClientProvider client={queryClient}><Story /></QueryClientProvider>
    )
  ],
} satisfies Meta<typeof FilterTVSeriesCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
  onUserInput: action("filter input"),
  nameFilter: "",
  genreFilter: "",
  ratingFilter: "",
  yearFilter: "",
  sortBy: "",

  },
};
Basic.storyName = "Default";