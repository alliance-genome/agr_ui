import { test, expect } from '@playwright/test';

test.describe('allele page', () => {
  test('renders header, title, parent gene link and sections for a mouse allele', async ({ page }) => {
    await page.goto('/allele/MGI:1856298');

    await expect(page).toHaveTitle(/Ank1.* \| Mus musculus allele/);
    await expect(page.getByRole('heading', { level: 1, name: /Ank1/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Ank1', exact: true }).first()).toHaveAttribute(
      'href',
      /^\/gene\/MGI:/
    );
    for (const section of ['Phenotypes', 'Disease Associations']) {
      await expect(page.getByRole('heading', { level: 3, name: section })).toBeVisible();
    }
    await expect(page.getByText('Page Not Found')).toHaveCount(0);
  });

  test('shows the not found page for an unknown allele', async ({ page }) => {
    await page.goto('/allele/MGI:NOT-A-REAL-ID');

    await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible();
  });
});
