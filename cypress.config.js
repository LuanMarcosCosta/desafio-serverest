const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  responseTimeout: 20000,
  defaultCommandTimeout: 20000,
  watchForFileChanges: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on, config) {
    },
    experimentalModifyObstructiveThirdPartyCode: true,
    baseUrl: 'https://front.serverest.dev/login',
    experimentalRunAllSpecs: true
  },
});
