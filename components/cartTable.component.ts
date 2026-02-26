import { Locator } from "@playwright/test"
import { expect } from "@playwright/test"


export type CartItem = {
  name: string
  price: number
  quantity: number
  total: number
}

export class CartTable {
  readonly root: Locator
  readonly removeProductButton: Locator

  constructor(root: Locator) {
    this.root = root
    this.removeProductButton = this.root.locator('.cart_delete')
  }

  async getItems(): Promise<CartItem[]> {
    const rows = this.root.locator('tbody tr')
    const count = await rows.count()

    const items: CartItem[] = []

    for (let i = 1; i < count; i++) {
      const row = rows.nth(i - 1)

      const name = (await row.locator('.cart_description a').textContent())!.trim()
      const price = Number((await row.locator('.cart_price').textContent())!.replace(/[^0-9]/g, ''))
      const quantity = Number(await row.locator('.cart_quantity').textContent())
      const total = Number((await row.locator('.cart_total').textContent())!.replace(/[^0-9]/g, ''))

      items.push({ name, price, quantity, total })
    }

    return items
  }

  async removeProductByName(name: string) {
    const rows = this.root.locator('tbody tr')
    const count = await rows.count()

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i)
      const productName = (await row.locator('.cart_description a').textContent())!.trim()

      if (productName === name) {
        await row.locator('.cart_delete a').click()
        return
      }
    }

    throw new Error(`Product "${name}" not found in cart`)
  }

  async expectProductRemoved(name: string) {
    const row = this.root
      .locator('tbody tr')
      .filter({
        has: this.root.locator('.cart_description a', { hasText: name })
      })

    await expect(row).toHaveCount(0)
  }
}
