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
