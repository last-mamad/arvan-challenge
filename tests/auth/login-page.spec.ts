import { test, expect } from '@playwright/test';

test('Login Page Structure', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await expect(page.locator('div').filter({ hasText: 'Sign in' }).nth(5)).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Username$/ })).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Password$/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up now' })).toBeVisible();
});

test('Failed Login Request', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('wrongUsername');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongPassword');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Sign-in Failed!Invalid')).toBeVisible();
});

test('Error Trigger', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.locator('div').filter({ hasText: /^Required field$/ }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Required field$/ }).nth(1)).toBeVisible();
});

test('Successfull Login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('emilys');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('emilyspass');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible();

    // The "Welcome <name>" greeting is desktop-only; on mobile the hamburger menu shows instead.
    const isMobile = test.info().project.use.isMobile ?? false;
    if (isMobile) {
        await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
    } else {
        await expect(page.getByText('WelcomeEmily')).toBeVisible();
    }
});