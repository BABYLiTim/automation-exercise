import { Page } from '@playwright/test'
import { HomePage } from './homePage'
import { AuthPage } from './authPage'
import { SignupPage } from './signupPage'
import { ContactUsPage } from './contactusPage'
import { ProductsPage } from '../page-objects/ProductsPage'
import { ProductDetailsPage } from '../page-objects/productDetailsPage'

export class PageManager {
  readonly page: Page
  readonly home: HomePage
  readonly auth: AuthPage
  readonly signup: SignupPage
  readonly contactUs: ContactUsPage
  readonly productsPage: ProductsPage
  readonly productDetailsPage: ProductDetailsPage

  constructor(page: Page) {
    this.page = page
    this.home = new HomePage(page)
    this.auth = new AuthPage(page)
    this.signup = new SignupPage(page)
    this.contactUs = new ContactUsPage(page)
    this.productsPage = new ProductsPage(page)
    this.productDetailsPage = new ProductDetailsPage(page)
  }
}

export default PageManager