import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "p46fag",
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
