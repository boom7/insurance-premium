import { test, expect } from '@playwright/test';

test('products list loads and displays products', async ({ page }) => {
  // Navigate to the app
  await page.goto('/'); 

  // Wait for the products list 
  await page.waitForSelector('.products-section .product-card', { state: 'attached' });

  const productCards = await page.locator('.product-card');

  expect(await productCards.count()).toBeGreaterThan(0); // Ensure at least one product is displayed

  const firstCard = productCards.first();
  const productName = await firstCard.locator('h3').textContent();
  const benefitText = await firstCard.locator('p').nth(0).textContent();

  expect(productName?.trim()).toBe('package 1');
  expect(benefitText?.trim()).toBe('200k');
});
