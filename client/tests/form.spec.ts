import { test, expect } from '@playwright/test';

test('form submission displays premium result', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');

  await page.fill('input[name="firstName"]', 'John');
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="birthDate"]', '1990-01-01');
  await page.fill('input[name="insuranceType"]', 'T11A20');
  await page.fill('input[name="premiumPerYear"]', '1000');

  // Select gender
  await page.selectOption('select[name="gender"]', 'MALE');
  
  // Select payment frequency
  await page.selectOption('select[name="paymentFrequency"]', 'YEARLY');

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait for the premium result to appear
  await page.waitForSelector('.result-container');

  const resultText = await page.textContent('.result-container');
  expect(resultText).toContain('Premium Calculation Result');
  expect(resultText).toContain('Plan Code: T11A20');
});
