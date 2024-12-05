import { test, expect } from '@playwright/test';

test('should display dashboard', async ({ page }) => {
  await page.goto('/dashboard');

  // Test the dashboard layout
  await expect(page.getByRole('main')).toBeVisible();

  // Test that metrics are present
  await expect(page.getByRole('region', { name: 'Metrics' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Metrics' }).getByRole('figure')).toHaveCount(4);
});
