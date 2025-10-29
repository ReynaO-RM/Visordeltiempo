import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Permitir el uso de `any` y relajar algunas reglas de TS opcionales
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // Opcional: desactivar la exigencia de tipos en la frontera de módulos
      // "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
]);

export default eslintConfig;
