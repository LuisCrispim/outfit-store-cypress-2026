import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: false,
  },

  e2e: {
    baseUrl: 'https://outfit-store-alpha.vercel.app',
    fixturesFolder: false,
  },
});