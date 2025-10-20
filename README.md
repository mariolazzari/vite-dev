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

```js
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src", "index.ts"),
      name: "coolMath",
      formats: ["es"],
    },
    minify: false,
    rollupOptions: {
      external: ["uuid"],
    },
  },
});
```

### Optimize export

[Docs](https://vite.dev/guide/build)

```json
{
  "name": "cool-math",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "files": ["dist"],
  "types": "./dist/index.d.ts",
  "module": "./dist/cool-math.js",
  "exports": {
    ".": {
      "import": "./dist/cool-math.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build && tsc",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@types/node": "^24.0.0",
    "@types/uuid": "^10.0.0",
    "typescript": "~5.8.3",
    "vite": "^6.3.5"
  },
  "dependencies": {
    "uuid": "^11.1.0"
  }
}
```

### Adding types

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    // "noEmit": true,

    // Emit types:
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "dist",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

```json
{
  "name": "cool-math",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "files": ["dist"],
  "types": "./dist/index.d.ts",
  "module": "./dist/cool-math.js",
  "exports": {
    ".": {
      "import": "./dist/cool-math.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build && tsc",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@types/node": "^24.0.0",
    "@types/uuid": "^10.0.0",
    "typescript": "~5.8.3",
    "vite": "^6.3.5"
  },
  "dependencies": {
    "uuid": "^11.1.0"
  }
}
```

### Bundle optimization

```ts
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src", "index.ts"),
      name: "coolMath",
      formats: ["es"],
    },
    minify: false,
    rollupOptions: {
      external: ["uuid"],
    },
  },
});
```

## Vite feature

### Linting

```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  }
);
```

### Bundle visualizer

[Package](https://www.npmjs.com/package/vite-bundle-visualizer?activeTab=dependencies)

```sh
npx vite-bundle-visualizer
```

### Host option

```json
  "scripts": {
    "dev": "vite --host",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
```

### Glob imports
