import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/reports/junit/results-[hash].xml',
    toConsole: true,
  },

  e2e: {
    baseUrl: 'https://outfit-store-alpha.vercel.app',
    fixturesFolder: false,
  },
});