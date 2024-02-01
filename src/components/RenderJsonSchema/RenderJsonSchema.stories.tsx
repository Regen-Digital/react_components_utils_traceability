import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import RenderJsonSchema from "./RenderJsonSchema";

const meta: any = {
  title: "Render json schema",
  component: RenderJsonSchema,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RenderJsonSchema>;

export default meta;
type Story = StoryObj<typeof meta>;

const schema = {
  type: "object",
  properties: {
    string: {
      type: "string",
    },
    boolean: {
      type: "boolean",
      description: "Boolean description as a tooltip",
    },
  },
};

export const Default: Story = {
  args: { schema },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
