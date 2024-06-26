import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/test-gallery/',
    build: {
        outDir: '../dist',
    },
    plugins: [react()],
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            containers: path.resolve(__dirname, 'src/containers/'),
            src: path.resolve(__dirname, 'src/'),
            styles: path.resolve(__dirname, 'src/styles/'),
            types: path.resolve(__dirname, 'src/types/'),
            utils: path.resolve(__dirname, 'src/utils/'),
        },
    },
    root: 'src',
});
