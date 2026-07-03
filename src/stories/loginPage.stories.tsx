import type { Meta, StoryObj } from "@storybook/react";
import LoginPage from "../pages/loginPage";
import { MemoryRouter } from "react-router";
import React from "react";

const meta = {
  title: "Authentication/LoginPage",
  component: LoginPage,
  decorators: [
    (Story: React.FC) => (
      <MemoryRouter initialEntries={["/login"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof LoginPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

Basic.storyName = "Default";