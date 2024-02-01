import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header';

const meta: any = {
  title: 'Header',
  component: Header,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const routerLinks = [
  { title: 'Digital Livestock', path: '/' },
  { title: 'Farm', path: '/farm' },
  { title: 'Farmers', path: '/farmers' },
];

export const Default: Story = {
  args: { routerLinks },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ minWidth: '500px' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};
