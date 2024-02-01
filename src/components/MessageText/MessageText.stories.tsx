import type { Meta, StoryObj } from '@storybook/react';

import { BrowserRouter } from 'react-router-dom';
import MessageText from './MessageText';
import { Status } from '../../models';

const meta = {
  title: 'Message text',
  component: MessageText,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MessageText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: Status.error,
    text: 'Network error',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
