import { test, expect } from './fixtures/pages'


test('Verify All Products and product detail page', async ({ pages }) => {

  await pages.productsPage.open()
  await expect(pages.productsPage.title).toBeVisible()

  await pages.productsPage.openFirstProduct()
  await pages.productDetailsPage.verifyProductDetailsVisible()
})
