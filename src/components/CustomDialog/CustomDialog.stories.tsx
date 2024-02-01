import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import DialogErrorFetchProductData from "./CustomDialog";

const meta: any = {
  title: "Custom Dialog",
  component: DialogErrorFetchProductData,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DialogErrorFetchProductData>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Demo custom dialog",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
