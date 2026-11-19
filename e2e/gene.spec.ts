import { test, expect } from '@playwright/test';

test.describe('gene page', () => {
  test('renders header, title and core sections for a human gene', async ({ page }) => {
    await page.goto('/gene/HGNC:11998');

    await expect(page).toHaveTitle(/TP53 \| Homo sapiens gene/);
    await expect(page.getByRole('heading', { level: 1, name: 'TP53' })).toBeVisible();
    for (const section of ['Orthology', 'Disease Associations', 'Alleles and Variants']) {
      await expect(page.getByRole('heading', { level: 3, name: section })).toBeVisible();
    }
    await expect(page.getByText('Page Not Found')).toHaveCount(0);
  });

  test('shows the not found page for an unknown gene', async ({ page }) => {
    await page.goto('/gene/HGNC:NOT-A-REAL-ID');

    await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible();
  });
});
