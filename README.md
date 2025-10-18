# Vite for developers

## Course introduction

## Vite introduction

### What is Vite

Build tool for web applications

- Fast
- Powerful defaults
- Not a bundler
  - esbuild for dev
  - rollup for building
- Dev server
- Scafolding tool
  - boilerplate
- Powerful plugin system

### First contact

```sh
pnpm create vite@latest
pnpm dev
pnpm build
pnpm preview
```

### ES and Common JS modules

### Module bunding

- dev script runs esBuild, a fast module bundler written in Go
- build script creates dist folder with Rollup, simple and efficient module bundler
- not referenced code is not bundled

### Source map

Helps to visualize executed code, with this settings in vite.config.js

```js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false,
  },
});
```

### Tree shaking

Dead code is removed

- export generates shakable code
- do not embed embet functions in objects (not detected by bundlers)

## Working with Vite

### Hot modules reloading

Hot module replacement (HMR): adds or removes modules while application is running, without a full reload.

### Handling assets

- imports images directly as other files
- imports imagese from public folder, without public prefix

### Configuring Vite

[Doc](https://vite.dev/config/)

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
```

### Enviroment variables

- Must start with pefix 'VITE\_'
- You can define prefix in config file
- You can create .env.production file

```sh
VITE_LANG=it
VITE_CLIENT=http://127.0.0.1:3000/
```

```js
console.log(import.meta.env);
```

### Mulptiple routes

```js
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin/index.html"),
      },
    },
  },
  envPrefix: "COOL_APP_",
});
```

### Creating multiple bundles

Chunking

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function manualChunks(id: string) {
  if (id.includes("node_modules")) {
    return "vendor";
  }
  return "main";
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
});
```

### Vite plugins

[Doc](https://vite.dev/plugins/)

```sh
pnpm add vite-plugin-remove-console -D
```

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import removeConsole from "vite-plugin-remove-console";

function manualChunks(id: string) {
  if (id.includes("node_modules")) {
    return "vendor";
  }
  return "main";
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), removeConsole()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
});
```

## Building a library

### Library mode
