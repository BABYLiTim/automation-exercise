import { test, expect } from './fixtures/pages'
import { users } from '../test-data/users'


test('User can submit the Contact Form', async ({pages}) => {
    const user = users.valid

    await pages.home.openContactUs()
    await pages.contactUs.fillContactForm(user, 'Test', 'Test')

    await pages.contactUs.uploadFile('tests/fixtures/avatar.png')
    await pages.contactUs.submitForm()
})