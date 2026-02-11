import { Locator } from "@playwright/test"


export type CartItem = {
  name: string
  price: number
  quantity: number
  total: number
}

export class CartTable {
  readonly root: Locator

  constructor(root: Locator) {
    this.root = root
  }

  async getItems(): Promise<CartItem[]> {
    const rows = this.root.locator('tbody tr')
    const count = await rows.count()

    const items: CartItem[] = []

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i)

      const name = (await row.locator('.cart_description a').textContent())!.trim()
      const price = Number((await row.locator('.cart_price').textContent())!.replace(/[^0-9]/g, ''))
      const quantity = Number(await row.locator('.cart_quantity').textContent())
      const total = Number((await row.locator('.cart_total').textContent())!.replace(/[^0-9]/g, ''))

      items.push({ name, price, quantity, total })
    }

    return items
  }
}
