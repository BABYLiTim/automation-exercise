import { Page, Locator, expect } from '@playwright/test'
import { AddedToCartPopUp } from '../components/addedToCart.component'

export class ProductDetailsPage {
  readonly page: Page

  readonly productName: Locator
  readonly category: Locator
  readonly price: Locator
  readonly availability: Locator
  readonly condition: Locator
  readonly brand: Locator
  readonly quantity: Locator
  readonly addToCartButton: Locator
  readonly addedToCartPopUp: AddedToCartPopUp

  constructor(page: Page) {
    this.page = page

    this.productName = page.locator('.product-information h2')
    this.category = page.getByText('Category:')
    this.price = page.locator('.product-information span span')
    this.availability = page.getByText('Availability:')
    this.condition = page.getByText('Condition:')
    this.brand = page.getByText('Brand:')
    this.quantity = page.locator('#quantity')
    this.addToCartButton = page.getByRole('button', {name: 'Add to cart'})
    this.addedToCartPopUp = new AddedToCartPopUp(page.locator('.modal-content'))
  }

  async verifyProductDetailsVisible() {
    await expect(this.productName).toBeVisible()
    await expect(this.category).toBeVisible()
    await expect(this.price).toBeVisible()
    await expect(this.availability).toBeVisible()
    await expect(this.condition).toBeVisible()
    await expect(this.brand).toBeVisible()
  }

  async increaseQuanity(times: string) {
    await this.quantity.fill(times)
  }

  async addToCart(){
    await this.addToCartButton.click()
  }
}