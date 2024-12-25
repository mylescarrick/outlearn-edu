/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

import eslint from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsparser from "@typescript-eslint/parser"
import importplugin from "eslint-plugin-import"
import jsxa11y from "eslint-plugin-jsx-a11y"
import reactplugin from "eslint-plugin-react"
import reacthooks from "eslint-plugin-react-hooks"
import globals from "globals"

/** @type {Array<import('eslint').Linter.Config>} */
export default [
  // Base configuration for all files
  {
    ignores: ["**/.server", "**/.client"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...eslint.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
        ...globals.commonjs,
      },
    },
  },

  // React configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactplugin,
      "jsx-a11y": jsxa11y,
      "react-hooks": reacthooks,
    },
    rules: {
      ...reactplugin.configs.recommended.rules,
      ...reactplugin.configs["jsx-runtime"].rules,
      ...reacthooks.configs.recommended.rules,
      ...jsxa11y.configs.recommended.rules,
    },
    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
      "import/resolver": {
        typescript: {},
      },
    },
  },

  // TypeScript configuration
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
      import: importplugin,
    },
    languageOptions: {
      parser: tsparser,
    },
    settings: {
      "import/internal-regex": "^~/",
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...importplugin.configs.recommended.rules,
      ...importplugin.configs.typescript.rules,
    },
  },

  // Node configuration
  {
    files: ["eslint.config.mjs"],
    languageOptions: {
      globals: {
        node: true,
      },
    },
  },
]
