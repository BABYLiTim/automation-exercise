import { Page } from '@playwright/test'
import { HomePage } from './homePage'
import { AuthPage } from './authPage'
import { SignupPage } from './signupPage'

export class PageManager {
  readonly page: Page
  readonly home: HomePage
  readonly auth: AuthPage
  readonly signup: SignupPage

  constructor(page: Page) {
    this.page = page
    this.home = new HomePage(page)
    this.auth = new AuthPage(page)
    this.signup = new SignupPage(page)
  }
}

export default PageManager