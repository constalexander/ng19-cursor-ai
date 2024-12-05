import { test, expect } from '@playwright/test';

test('should display dashboard', async ({ page }) => {
  await page.goto('/');

  // Basic test to verify the dashboard loads
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('navigation')).toBeVisible();
});
