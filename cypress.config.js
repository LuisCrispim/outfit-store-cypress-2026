import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://outfit-store-alpha.vercel.app',
    fixturesFolder: false,
  },
});
