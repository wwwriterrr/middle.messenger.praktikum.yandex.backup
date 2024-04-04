import { defineConfig } from 'vite';
import postcssNesting from 'postcss-nesting';
import precss from "precss";

export default defineConfig({
    root: './',
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
    css: {
        postcss: {
            plugins: [
                postcssNesting,
                precss
            ],
        },
    },
})