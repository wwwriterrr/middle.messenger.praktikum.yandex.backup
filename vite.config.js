import { defineConfig } from 'vite';

/*export default defineConfig({
    root: './',
    //base: './',
    publicDir: './src/assets/',
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
})*/

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        port: 3000
    },
    server: {
        host: '0.0.0.0',
        outDir: 'dist',
        port: 3000,
        minify: 'esbuild',
    },
})