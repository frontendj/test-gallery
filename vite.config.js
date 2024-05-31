import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            containers: path.resolve(__dirname, 'src/containers/'),
            src: path.resolve(__dirname, 'src/'),
            store: path.resolve(__dirname, 'src/store/'),
            styles: path.resolve(__dirname, 'src/styles/'),
            types: path.resolve(__dirname, 'src/types/'),
            utils: path.resolve(__dirname, 'src/utils/'),
        },
    },
    root: 'src',
});
