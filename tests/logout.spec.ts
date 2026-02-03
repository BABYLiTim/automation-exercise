import { test, expect } from './fixtures/pages'

test('User can logout', async ({ pages }) => {
    // Click on 'Signup / Login' button
    await pages.home.openSignupLoginPage()

    /** 
     * 1. Enter correct email address and password
     * 2. Click 'login' button
    */
   await pages.auth.login(process.env.USER_EMAIL_VALID!, process.env.USER_PASSWORD_VALID!)

   // Logout
   await pages.home.logout()

   // Verify that user is navigated to login page
   await pages.auth.expectLoginForm()
})