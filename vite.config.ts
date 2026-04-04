import { defineConfig } from "vitest/config"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"
import { swc } from "@o.z/vite-plugin-swc"
import { resolve, relative, extname, dirname, basename } from "node:path"
import { glob } from "glob"
import { readFileSync, writeFileSync } from "node:fs"

const scssEntries = Object.fromEntries(
  glob
    .sync("src/lib/styles/**/*.{css,scss,sass}")
    .map((file) => [
      relative("src/lib", file).slice(0, -extname(file).length),
      resolve(__dirname, file),
    ]),
)
const tsIgnore = [
  "**/_*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
  "**/_*/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
  "**/*.d.ts",
  "**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
]
const tsEntries = Object.fromEntries(
  glob
    .sync("src/lib/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}", {
      ignore: tsIgnore,
    })
    .map((file) => [
      relative("src/lib", file).replace(/\.tsx?$/, ""),
      resolve(__dirname, file),
    ]),
)

function updatePackageExports(entries: Record<string, string>) {
  return {
    name: "update-package-exports" as const,
    apply: "build" as const,
    closeBundle() {
      const pkgPath = resolve(__dirname, "package.json")
      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"))
      const exports: Record<string, any> = {}

      Object.keys(entries).forEach((key) => {
        const sourcePath = entries[key]
        const ext = extname(sourcePath)
        const isStyle = /\.(css|scss|sass)$/.test(ext)

        const parentDirName = basename(dirname(sourcePath))
        const fileName = basename(key)
        let exportKey = isStyle ? `./${key}.css` : `./${key}`

        if (key === "index" || key === "main") {
          exportKey = "."
        } else if (parentDirName !== "lib" && fileName === "index") {
          exportKey = `./${parentDirName}`
        }

        if (exportKey === "." && !isStyle) {
          pkg.types = `./dist/${key}.d.ts`
          pkg.module = `./dist/${key}.js`
          pkg.main = `./dist/${key}.cjs`
        }

        exports[exportKey] = isStyle
          ? { import: `./dist/${key}.css`, require: `./dist/${key}.css` }
          : {
              types: `./dist/${key}.d.ts`,
              import: `./dist/${key}.js`,
              require: `./dist/${key}.cjs`,
            }
      })

      pkg.exports = exports
      writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n")
      console.log("✅ package.json exports updated based on entries.")
    },
  }
}

export default defineConfig({
  build: {
    outDir: "dist",
    sourcemap: false,
    emptyOutDir: false,
    cssMinify: false,
    lib: {
      name: "@o.z/zdi",
      entry: tsEntries,
    },
    rollupOptions: {
      input: {
        ...tsEntries,
        ...scssEntries,
      },
      output: [
        {
          format: "es",
          entryFileNames: "[name].js",
          dir: "dist",
        },
        {
          format: "cjs",
          entryFileNames: "[name].cjs",
          dir: "dist",
        },
      ],
    },
  },
  plugins: [
    swc(),
    libInjectCss(),
    dts({
      exclude: tsIgnore,
      include: ["src/lib/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      rollupTypes: false,
      entryRoot: "src/lib",
      outDir: "dist",
    }),
    updatePackageExports({ ...tsEntries, ...scssEntries }),
  ],
  test: {
    reporters: ["verbose"],
    globals: true,
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
    setupFiles: "./src/test/setup.ts",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/lib/**/*.ts"],
    },
  },
  worker: {
    format: "es",
    plugins() {
      return [swc()]
    },
  },
})
