import type { Meta, StoryObj } from '@storybook/react';

import { expect, within } from '@storybook/test';
import { Button, ButtonStyling } from 'components/Button/Button';

const meta = {
    argTypes: {
        styling: { control: { options: ButtonStyling, type: 'select' } },
    },
    component: Button,
    parameters: {
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    title: 'Core/Button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        styling: 'default',
        text: 'Yay',
    },
    // More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const yayButton = canvas.getByRole('button', { name: /Yay/i });
        await expect(yayButton).toBeInTheDocument();

        const nayButton = canvas.queryByRole('button', { name: /Nay/i });
        expect(nayButton).not.toBeInTheDocument();
    },
};

export const Destructive: Story = {
    args: {
        styling: 'destructive',
        text: 'Button',
    },
};
