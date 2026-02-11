import { test, expect } from './fixtures/pages'


test('Verify All Products and product detail page', async ({ pages }) => {

  await pages.productsPage.open()
  await expect(pages.productsPage.title).toBeVisible()

  await pages.productsPage
  await pages.productDetailsPage.verifyProductDetailsVisible()
})

test('Search Product', async ({pages}) => {
  const productName = 'Dress'

  await pages.productsPage.open()
  await expect(pages.productsPage.title).toBeVisible()

  await pages.productsPage.searchProduct(productName)
  await pages.productsPage.expectAllProductsMatchSearch(productName)
})

test('User can add two products to cart and verify totals', async ({ pages }) => {
  await pages.productsPage.open()
  //await pages.productsPage.expectVisible()

  const firstProduct = await pages.productsPage.getProductCard(0)
  const secondProduct = await pages.productsPage.getProductCard(1)

  const firstPrice = await firstProduct.getPrice()
  const secondPrice = await secondProduct.getPrice()

  await firstProduct.addToCart()
  await pages.productsPage.addedToCartPopUp.continueShopping()

  await secondProduct.addToCart()
  await pages.productsPage.addedToCartPopUp.viewCart()

  const items = await pages.cartPage.cartTable.getItems()

  expect(items.length).toBe(2)

  expect(items[0].quantity).toBe(1)
  expect(items[0].price).toBe(firstPrice)
  expect(items[0].total).toBe(firstPrice)

  expect(items[1].quantity).toBe(1)
  expect(items[1].price).toBe(secondPrice)
  expect(items[1].total).toBe(secondPrice)
})

