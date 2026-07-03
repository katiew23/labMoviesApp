import type { Meta, StoryObj } from '@storybook/react';
import MovieHeader from "../components/headerMovie";
import { SampleTVSeries } from "./sampleData";
import { MemoryRouter } from "react-router";

import React from 'react';

const meta = {
    title: "TV Series Details Page/TVSeriesHeader",
    component: MovieHeader,
    decorators: [
        (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    ],
} satisfies Meta<typeof MovieHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        ...SampleTVSeries
    }
};

Basic.storyName = "Default";