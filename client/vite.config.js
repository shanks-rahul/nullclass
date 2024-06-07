import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';



// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  resolve: {
    alias: {
      fs: require.resolve('rollup-plugin-node-builtins'),
  //     // util: "rollup-plugin-node-polyfills/polyfills/util",
  //     // assert: "rollup-plugin-node-polyfills/polyfills/assert",
  //     // os: "rollup-plugin-node-polyfills/polyfills/os",
  //     buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
  //     //process: "rollup-plugin-node-polyfills/polyfills/process-es6",
  //     //fs: "rollup-plugin-node-polyfills/polyfills/empty",
  //     // net: "rollup-plugin-node-polyfills/polyfills/empty",
  //     // perf_hooks: "rollup-plugin-node-polyfills/polyfills/empty",
  //     //path: "rollup-plugin-node-polyfills/polyfills/path",
  //     //child_process: "rollup-plugin-node-polyfills/polyfills/empty",
  //     // http: require.resolve('rollup-plugin-node-builtins'),
  //     // util: require.resolve('rollup-plugin-node-builtins'),
  //     // stream: require.resolve('rollup-plugin-node-builtins'),
  //     // buffer: require.resolve('rollup-plugin-node-builtins'),
  //     // process: require.resolve('rollup-plugin-node-builtins'),
  //     // url: require.resolve('rollup-plugin-node-builtins'),
  //     // querystring: require.resolve('rollup-plugin-node-builtins'),
     }
    }
  
})
