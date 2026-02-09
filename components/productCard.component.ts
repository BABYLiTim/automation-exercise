import { Locator, expect } from '@playwright/test'

export class ProductCard {
  readonly root: Locator
  readonly name: Locator

  constructor(root: Locator) {
    this.root = root
    this.name = root.locator('p')
  }

  async expectVisible() {
    await expect(this.root).toBeVisible()
  }

  async expectNameContains(text: string) {
    await expect(this.name).toContainText(text)
  }
}