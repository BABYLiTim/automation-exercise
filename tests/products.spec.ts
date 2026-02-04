import { test, expect } from './fixtures/pages'
import { Page } from '@playwright/test'
import { ProductsPage } from '../page-objects/ProductsPage'
import { ProductDetailsPage } from '../page-objects/productDetailsPage'


test('Verify All Products and product detail page', async ({ page }) => {
  const productsPage = new ProductsPage(page)
  const productDetailsPage = new ProductDetailsPage(page)

  await productsPage.open()
  await expect(productsPage.title).toBeVisible()

  await productsPage.openFirstProduct()
  await productDetailsPage.verifyProductDetailsVisible()
})
