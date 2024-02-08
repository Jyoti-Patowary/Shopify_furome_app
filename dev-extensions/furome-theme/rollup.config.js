import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import { nodeResolve } from '@rollup/plugin-node-resolve';

const input = {
  app: "./assets/app.js",
};

export default {
  input,
  output: {
    dir: "../../extensions/furome-theme/assets",
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    copy({
      targets: [
        { src: "./assets/*.css", dest: "../../extensions/furome-theme/assets" },
        {
          src: "./blocks/*.liquid",
          dest: "../../extensions/furome-theme/blocks",
        },
      ],
    }),
  ],
};