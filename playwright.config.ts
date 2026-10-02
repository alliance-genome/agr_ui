import { defineConfig, devices } from '@playwright/test';

// Smoke tests run against a local Vite dev server that proxies /api to API_URL
// (stage by default). Set E2E_BASE_URL to test an already running or deployed
// site instead, e.g. E2E_BASE_URL=https://stage.alliancegenome.org.
// A dedicated port keeps the tests from reusing an unrelated server on 3000.
const port = Number(process.env.E2E_PORT || 3100);
const baseURL = process.env.E2E_BASE_URL || `http://localhost:${port}`;
const apiURL = process.env.API_URL || 'https://stage.alliancegenome.org';

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: { timeout: 30_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: `npx vite --port ${port} --strictPort`,
        url: baseURL,
        env: { API_URL: apiURL },
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
