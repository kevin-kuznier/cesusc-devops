import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default [
  // Aplica as regras recomendadas do ESLint
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      // Define os globais para que o ESLint reconheça 'require', '__dirname', etc.
      globals: {
        ...globals.node,
        ...globals.browser
      },
      sourceType: "commonjs"
    },
    rules: {
      // Aqui você pode personalizar regras se quiser
      "no-unused-vars": "warn" 
    }
  }
];



