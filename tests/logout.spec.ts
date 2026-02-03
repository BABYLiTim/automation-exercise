import { test, expect } from './fixtures/pages'
import { users } from '../test-data/users'

test('User can logout', async ({ pages }) => {
    const user = users.valid
    // Click on 'Signup / Login' button
    await pages.home.openSignupLoginPage()

    /** 
     * 1. Enter correct email address and password
     * 2. Click 'login' button
    */
   await pages.auth.login(user)

   // Logout
   await pages.home.logout()

   // Verify that user is navigated to login page
   await pages.auth.expectLoginForm()
})