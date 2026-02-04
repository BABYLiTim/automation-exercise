import { Page, Locator } from '@playwright/test'

export class ProductsPage {
  readonly page: Page
  readonly title: Locator
  readonly firstViewProductLink: Locator

  constructor(page: Page) {
    this.page = page
    this.title = page.getByRole('heading', { name: 'All Products' })
    this.firstViewProductLink = page.getByRole('link', { name: 'View Product' }).first()
  }

  async open() {
    await this.page.goto('/products')
  }

  async openFirstProduct() {
    await this.firstViewProductLink.click()
  }
}