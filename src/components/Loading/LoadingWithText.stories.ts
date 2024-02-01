import type { Meta, StoryObj } from "@storybook/react";

import LoadingWithText from "./LoadingWithText";

const meta: any = {
  title: "Loading with text",
  component: LoadingWithText,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LoadingWithText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { text: "Loading..." },
};
