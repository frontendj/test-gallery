import { expect, test } from '@playwright/test';

test('Default story interactions', async ({ page }) => {
    // Navigate to the specific Storybook story. Replace the URL with the actual URL of your story.
    await page.goto('http://localhost:6006/iframe.html?id=core-button--default');

    // Check if the 'Yay' button is present
    const yayButton = page.locator('role=button[name="Yay"]');
    await expect(yayButton).toBeVisible();

    // Check that the 'Nay' button does not exist
    const nayButton = page.locator('role=button[name="Nay"]');
    await expect(nayButton).not.toBeVisible();
});
