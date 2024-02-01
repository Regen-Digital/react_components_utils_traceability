import type { Meta, StoryObj } from "@storybook/react";

import Scanner from "./Scanner";

const meta: any = {
  title: "Scanner",
  component: Scanner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    // Define prop types and actions here
    qrbox: { control: "object" },
    qrCodeSuccessCallback: { action: "QR Code Scanned" },
  },
} satisfies Meta<typeof Scanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    qrCodeSuccessCallback: (decodedText: string) =>
      console.log(`Scanned QR Code: ${decodedText}`),
  },
};
