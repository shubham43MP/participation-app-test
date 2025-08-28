export default [
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
    ignores: ["node_modules/", ".next/", "build/"],
  },
];
