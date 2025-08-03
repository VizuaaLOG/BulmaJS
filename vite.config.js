import { resolve } from 'node:path'
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: resolve('./src/index.ts'),
            name: 'BulmaJS',
            fileName: 'bulmajs',
        },
    },
    esbuild: {
        target: 'es2015',
    },
    plugins: [dts({
        rollupTypes: true,
        include: ['src'],
        insertTypesEntry: true,
        respectExternal: true,
    })]
});