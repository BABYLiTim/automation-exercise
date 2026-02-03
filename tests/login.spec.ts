import { test, expect } from './fixtures/pages'
import { users } from '../test-data/users'

test('User can login with valid credentials', async ({ pages }) => {
    const user = users.valid

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
   await pages.auth.login(user)

   // Verify that 'Logged in as username' is visible
   await pages.home.expectUserLoggedIn(user.name)
})

test('User cannot login with invalid credentials', async ({ pages }) => {
    const user = users.invalid
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
    await pages.auth.login(user)

    // Verify error 'Your email or password is incorrect!' is visible
    await pages.auth.expectErrorMessage()
})