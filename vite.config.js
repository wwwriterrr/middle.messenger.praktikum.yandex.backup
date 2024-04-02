import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        port: 3000
    },
    server: {
        port: 3000
    },
})