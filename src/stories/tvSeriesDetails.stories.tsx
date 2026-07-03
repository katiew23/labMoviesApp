import type { Meta, StoryObj } from '@storybook/react';
import TVSeriesDetails from "../components/tvSeriesDetails";
import { SampleTVSeries } from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

const meta = {
    title: "TV Series Details Page/TVSeriesDetails",
    component: TVSeriesDetails,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
      ],
} satisfies Meta<typeof TVSeriesDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: SampleTVSeries
};

Basic.storyName = "Default";