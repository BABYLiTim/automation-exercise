import { test, expect } from './fixtures/pages'

test('User can login with valid credentials', async ({ pages }) => {
    // Verify that home page is visible successfully
    await pages.home.expectHomePage()

    //  Click on 'Signup / Login' button
    await pages.home.openSignupLoginPage()

    // Verify 'Login to your account' is visible
    await pages.auth.expectLoginForm()

    /** 
     * 1. Enter correct email address and password
     * 2. Click 'login' button
    */
   await pages.auth.login(process.env.USER_EMAIL_VALID!, process.env.USER_PASSWORD_VALID!)

   // Verify that 'Logged in as username' is visible
   await pages.home.expectUserLoggedIn('Alex')
})

test('User cannot login with invalid credentials', async ({ pages }) => {
    // Verify that home page is visible successfully
    await pages.home.expectHomePage()

    //  Click on 'Signup / Login' button
    await pages.home.openSignupLoginPage()

    // Verify 'Login to your account' is visible
    await pages.auth.expectLoginForm()

    /** 
     * 1. Enter incorrect email address and password
     * 2. Click 'login' button
    */
    await pages.auth.login(process.env.USER_EMAIL_INVALID!, process.env.USER_PASSWORD_INVALID!)

    // Verify error 'Your email or password is incorrect!' is visible
    await pages.auth.expectErrorMessage()
})