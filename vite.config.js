import { resolve } from 'node:path'
import {defineConfig} from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: resolve('./src/bulma.ts'),
            name: 'BulmaJS',
            fileName: 'bulmajs',
        },
    },
    esbuild: {
        target: 'es2015',
    }
});