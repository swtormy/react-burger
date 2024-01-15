import { defineConfig } from "cypress";

import('dotenv/config');

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      config.env.REACT_APP_TEST_USER = process.env.REACT_APP_TEST_USER;
      config.env.REACT_APP_TEST_PASSWORD = process.env.REACT_APP_TEST_PASSWORD;
      return config;
    },
  },
});
