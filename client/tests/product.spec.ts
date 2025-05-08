import { test, expect } from '@playwright/test';

test('products list loads and displays products', async ({ page }) => {
  // Navigate to the app
  await page.goto('/'); 

  // Wait for the products list 
  await page.waitForSelector('.products-section .product-card', { state: 'attached' });

  const productCards = await page.locator('.product-card');

  expect(await productCards.count()).toBeGreaterThan(0); // Ensure at least one product is displayed

  // Loop through product cards
  const firstProductName = await productCards.first().locator('h3').textContent();
  const firstProductBenefit = await productCards.first().locator('p').textContent();

  expect(firstProductName).toBe('package 1');
  expect(firstProductBenefit).toBe('200k'); 
});
