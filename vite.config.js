import { dirname, resolve } from 'node:path'

/** @type {import('vite').UserConfig} */
export default {
    build: {
        outDir: 'dist',
        lib: {
            entry: resolve('./src/bulma.ts'),
            name: 'BulmaJS',
            fileName: 'bulmajs',
        }
    }
}