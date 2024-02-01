import type { StoryObj } from '@storybook/react';
import MessageText from './MessageText';
declare const meta: {
    title: string;
    component: typeof MessageText;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {};
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
