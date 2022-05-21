import { defineConfig, splitVendorChunkPlugin } from 'vite'

import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   build: {
      lib: {
         entry: path.resolve(__dirname, './src/main.tsx'),
         name: 'Clarity',
         formats: ['iife'],
         fileName: 'clarity'
      },
      target: 'esnext',
      sourcemap: 'inline',
      emptyOutDir: false,
      minify: false,
      // rollupOptions: {
      //    external: ['react', 'react-dom', 'react-color-palette', 'use-immer', 'immer'],
      //    output: {
      //       globals: {
      //          'react': 'react',
      //          'react-dom': 'ReactDOM',
      //          'react-color-palette': 'ReactColorPalette',
      //          'use-immer': 'useImmer',
      //          'immer': 'immer'
      //       },
      //    }
      // }
   },

   resolve: {
      alias: {
         '@tools': path.resolve(__dirname, './src/ts/tools'), // remove
         '@interfaces': path.resolve(__dirname, './src/interfaces'),
         '@ts': path.resolve(__dirname, './src/ts'),
         '@styles': path.resolve(__dirname, './src/styles'),
         '@components': path.resolve(__dirname, './src/components'),
         '@hooks': path.resolve(__dirname, './src/hooks'),
         '@assets': path.resolve(__dirname, './src/assets'),
         // '@src': path.resolve(__dirname, './src'),
      }
   },
   base: './'
})
