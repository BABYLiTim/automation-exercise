import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('Consent the Cookie Banner', async({page}) => {
    await page.goto('/')
    const consentButton = page.getByRole('button', {name: 'Consent'})

    if (await consentButton.count() > 0) {
        await consentButton.first().click();
    }
    
    await page.context().storageState({ path: authFile });
})