import { Locator, expect } from '@playwright/test'

export class ProductCard {
  readonly root: Locator
  readonly name: Locator
  readonly price: Locator
  readonly addToCartButton: Locator

  constructor(root: Locator) {
    this.root = root
    this.name = root.locator('p')
    this.price = root.locator('h2')
    this.addToCartButton = root.locator('.add-to-cart')
  }

  async addToCart() {
    await this.root.hover()
    await this.addToCartButton.click()
  }

  async getName(): Promise<string> {
    return (await this.name.textContent())!.trim()
  }

  async getPrice(): Promise<number> {
    const text = await this.price.textContent()
    return Number(text?.replace(/[^0-9]/g, ''))
  }

  async expectVisible() {
    await expect(this.root).toBeVisible()
  }

  async expectNameContains(text: string) {
    await expect(this.name).toContainText(text)
  }
}