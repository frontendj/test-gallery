import type { Meta, StoryObj } from '@storybook/react';

import { expect, within } from '@storybook/test';
import { ImageCard } from 'components/ImageCard/ImageCard';

const meta = {
    argTypes: {},
    component: ImageCard,
    parameters: {
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    title: 'Core/ImageCard',
} satisfies Meta<typeof ImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        a11yLabel: 'Some beautiful photo',
        aspectRatio: 1.5,
        authorName: 'John Smith',
        downloadUrl: '#',
        imageSrc: 'https://picsum.photos/id/0/300/200',
        onClick: () => console.log('click'),
    },
    play: async ({ canvasElement }) => {
        // This is quite artificial test and it just shows possibilities of using testing library within Storybook

        const canvas = within(canvasElement);

        // Find the Download button
        const downloadButton = canvas.getByRole('link', { name: /Download/i });

        // Find the image card content
        const imageCardContent = canvas.getByTestId('image-card-content');

        // Get the computed style of the image card content
        const style = window.getComputedStyle(imageCardContent);

        // Assert that the default image card content's z-index is as expected
        await expect(style.zIndex).toBe('-1');

        // Focus the Download button
        await downloadButton.focus();

        // Assert that the image card content is visible
        await expect(style.zIndex).toBe('1');
    },
};
