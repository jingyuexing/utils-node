/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from 'vite'
import path from "path";
export default defineConfig({
  resolve:{
    alias:{
      "~":path.resolve(__dirname,"./"),
      "@":path.resolve(__dirname,"./src/")
    }
  },
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
    reporters: ['html','json'],
    coverage:{
      reportsDirectory:"./coverage/"
    }
  },
})
