const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  responseTimeout: 20000,
  defaultCommandTimeout: 20000,
  watchForFileChanges: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {
    produtoId: '',
    token_produto_excluir: '',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalModifyObstructiveThirdPartyCode: true,
    baseUrl: 'https://front.serverest.dev/login',
    experimentalRunAllSpecs: true
  },
});
