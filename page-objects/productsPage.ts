import { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'
import { ProductCard } from '../components/productCard.component'
import { AddedToCartPopUp } from '../components/addedToCart.component'

export class ProductsPage {
  readonly page: Page
  readonly title: Locator
  readonly firstViewProductLink: Locator
  readonly searchProductField: Locator
  readonly submitSearch: Locator
  readonly searchedProductsTitle: Locator
  readonly productCardRoots: Locator
  readonly addToCart: Locator
  readonly addedToCartPopUp: AddedToCartPopUp

  constructor(page: Page) {
    this.page = page
    this.title = page.getByRole('heading', { name: 'All Products' })
    this.firstViewProductLink = page.getByRole('link', { name: 'View Product' }).first()
    this.searchProductField = page.getByPlaceholder('Search Product')
    this.submitSearch = page.locator('#submit_search')
    this.searchedProductsTitle = page.getByRole('heading', {name: 'Searched Products'})
    this.productCardRoots = page.locator('.productinfo')
    this.addToCart = page.locator('.productinfo .add-to-cart').first()
    this.addedToCartPopUp = new AddedToCartPopUp(page.locator('.modal-content'))
  }

  async open() {
    await this.page.goto('/products')
  }

  async openFirstProduct() {
    await this.firstViewProductLink.click()
  }

  async searchProduct(product: string) {
    await this.searchProductField.fill(product)
    await this.submitSearch.click()
  }

  private async getProductCards(): Promise<ProductCard[]> {
    const count = await this.productCardRoots.count()

    return Array.from({ length: count }).map((_, index) =>
      new ProductCard(this.productCardRoots.nth(index))
    )
  }

  async expectAllProductsMatchSearch(searchText: string) {
    await expect(this.searchedProductsTitle).toBeVisible()

    const cards = await this.getProductCards()
    expect(cards.length).toBeGreaterThan(0)

    for (const card of cards) {
      await card.expectVisible()
      await card.expectNameContains(searchText)
    }
  }

  // async addProductToCart(){
  //   await this.productCardRoots.first().hover()
  //   await this.addToCart.click()
  // }

  async getProductCard(index: number): Promise<ProductCard> {
    return new ProductCard(this.productCardRoots.nth(index))
  }

}