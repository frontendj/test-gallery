# Demo gallery (React / TS)

## Overview

Demo Gallery is a React application that displays a grid of images fetched from the Lorem Pictus API. Users can load more images by scrolling or clicking a "Load More" button. The application supports basic accessibility features including live announcements for screen readers when new images are loaded.

## Features

-   Infinite scrolling to load more images
-   Button to manually load more images
-   Accessible live announcements for screen readers
-   Modal for full-screen image previews
-   Responsive design

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/frontendj/demo-gallery.git
cd demo-gallery
```

2. Install dependencies:

```
yarn install
```

## Usage

To start the development server, run:

```
yarn dev
```

This will start the application on http://localhost:5173

## Scripts

yarn dev: Starts the development server.
yarn build: Builds the project for production.
yarn preview: Previews the production build locally.
yarn test: Runs the Playwright tests.
yarn lint: Lints the code using ESLint.
yarn format: Formats the code using Prettier.
yarn storybook: Starts Storybook for component development.
yarn build-storybook: Builds the Storybook for deployment.

## Key Components

**HomeContainer**
The main container component that handles loading images and managing state for the image grid and modal.

**ImageGrid**
Displays a grid of images. Supports infinite scrolling and manual loading of more images.

**ImageCard**
Represents an individual image in the grid.

**ImageModal**
Displays a full-screen preview of the selected image.

**Announcer**
Handles live announcements for screen readers to improve accessibility.

**useImageLoader**
Custom hook to manage fetching images from the API and handling loading states.

**useAnnouncer**
Custom hook to manage live announcements for screen readers.

## Accessibility

This project includes accessibility features to improve the user experience for people using screen readers:

**Live Announcements:** New images are announced to screen readers when they are loaded.
**Keyboard Navigation:** Users can navigate through images and interact with the "Load More" button using the keyboard.

## Stack

-   HTML5
-   CSS3
-   JS (ES6+)
-   React
-   Typescript
-   Vite
