import { test, expect } from '@playwright/test';

test('Register Page Structure', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await expect(page.locator('div').filter({ hasText: 'Sign up' }).nth(5)).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Email$/ })).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Username$/ })).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Password$/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign in now' })).toBeVisible();
});

test('Successfull Register', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('mohammad@gmail.com');
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('mohammad');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('mohammad1412');
    await page.getByRole('button', { name: 'Sign up' }).click();

    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();

    // The "Welcome <name>" greeting is desktop-only; on mobile the hamburger menu shows instead.
    const isMobile = test.info().project.use.isMobile ?? false;
    if (isMobile) {
        await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
    } else {
        await expect(page.getByText('WelcomeEmily')).toBeVisible();
    }
});

test('Error Trigger', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await expect(page.locator('div').filter({ hasText: /^Required field$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Required field$/ }).nth(1)).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Required field$/ }).nth(2)).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('mohammad');
    await expect(page.locator('div').filter({ hasText: /^Invalid email$/ })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('mohammad@gmail.com');
    await expect(page.locator('div').filter({ hasText: /^Email$/ })).toBeVisible();
});