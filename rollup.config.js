import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import url from 'rollup-plugin-url';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const packageJson = require('./package.json');

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: 'src/index.ts',
    external: ['axios'],
    output: [
      {
        file: packageJson.main,
        format: 'esm',
        globals: {
          axios: 'axios',
        },
      },
    ],
    plugins: [
      typescript(),
      peerDepsExternal(),

      resolve({
        browser: true,
        preferBuiltins: false,
        // Add fallback for 'path' module
        fallback: { path: require.resolve('path-browserify') },
      }),
      commonjs({
        include: 'node_modules/**',
      }),
      json(),
      terser(),
      url({
        limit: false, // Load image as base64
      }),
    ],
  },
  {
    input: 'build/cjs/types/src/index.d.ts',
    output: [{ file: 'build/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
];
