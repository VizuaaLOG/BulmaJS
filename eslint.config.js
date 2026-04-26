import js from '@eslint/js';
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: [
            'dist/',
            'docs/',
            'scripts/',
            'webpack.config.js'
        ],
        files: ['src/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser
        },
        rules: {
            ...js.configs.recommended.rules,
            indent: [
                'error',
                4
            ],
            quotes: [
                'error',
                'single'
            ],
            semi: [
                'error',
                'always'
            ],
            'no-unused-vars': [
                'warn',
                'all'
            ]
        }
    }
]);
