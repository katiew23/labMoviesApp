import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import TVSeriesHeader from "../components/tvSeriesHeader";
import { SampleTVSeries } from "./sampleData";

const meta = {
  title: "TV Series Page/TVSeriesHeader",
  component: TVSeriesHeader,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <MoviesContextProvider>
          <Story />
        </MoviesContextProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof TVSeriesHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    ...SampleTVSeries,
  },
};