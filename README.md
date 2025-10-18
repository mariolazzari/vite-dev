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
