const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  env: {
    apiUrl: 'http://localhost:8081',
    username: 'test2@test.fr',
    password: 'testtest' 
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080/#/',
  },
  viewportWidth: 1300,
  viewportHeight: 1200,
});
