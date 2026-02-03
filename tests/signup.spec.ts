import { test, expect } from './fixtures/pages'

test('signup flow using PageManager', async ({ pages }) => {
  const rand = Math.floor(Math.random() * 100000)
  const signupData = {
    name: `user${rand}`,
    email: `user${rand}@example.com`,
    password: 'Password123',
    // add other fields required by your SignupData shape or components
  } as any

  await pages.home.openSignupLoginPage()
  await pages.auth.signup(signupData.name, signupData.email)
  await pages.signup.createAccount(signupData)
  await pages.home.expectUserLoggedIn(signupData.name)

  // cleanup
  await pages.home.deleteAccount()
  await pages.home.expectAccountDeleted()
  await pages.home.continueAfterAccountDeletion()
})