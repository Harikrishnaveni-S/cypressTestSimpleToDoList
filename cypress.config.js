const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    url: "https://harikrishnaveni-s.github.io/simple-to-do-list/"
  }

});
