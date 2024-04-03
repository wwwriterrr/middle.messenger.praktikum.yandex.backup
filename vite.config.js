import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    //base: './',
    publicDir: './',
    build: {
        outDir: './dist/',
        port: 3000
    },
    server: {
        host: '0.0.0.0',
        outDir: './dist/',
        port: 3000,
        minify: 'esbuild',
    },
})