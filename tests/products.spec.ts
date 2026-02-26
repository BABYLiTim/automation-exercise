import { test, expect } from './fixtures/pages'
import { faker } from '@faker-js/faker'
import { Gender } from '../types/gender'
import { Country } from '../types/country'
import { SignupData } from '../types/signupData'
import { CardDetails } from '../types/cardDetails'
import { mapSignupToAddress } from '../mappers/signup.mapper'
import { buildSignupData } from '../builders/signup.builder'
import { buildCardDetails } from '../builders/card.builder'


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

test('User can increase a quantity of the product', async ({ pages }) => {
  
  await pages.productsPage.openFirstProduct()
  await pages.productDetailsPage.verifyProductDetailsVisible()

  await pages.productDetailsPage.increaseQuanity('4')
  await pages.productDetailsPage.addToCart()
  await pages.productDetailsPage.addedToCartPopUp.viewCart()

  const item = await pages.cartPage.cartTable.getItems()

  expect(item[0].quantity).toBe(4)
})

test('User can remove products from cart', async ({pages}) => {
  // 1. Verify that home page is visible successfully
  await pages.home.expectHomePage()

  // 2. Add products to cart
  const firstProduct = await pages.home.getProductCard(0)
  const secondProduct = await pages.home.getProductCard(1)

  const firstProductName = await firstProduct.getName()
  const secondProductName = await secondProduct.getName()

  await firstProduct.addToCart()
  await pages.productsPage.addedToCartPopUp.continueShopping()

  await secondProduct.addToCart()
  await pages.productsPage.addedToCartPopUp.viewCart()

  // 3. Verify that cart page is displayed
  await pages.cartPage.expectCartPage()

  // 4. Click 'X' button corresponding to particular product
  await pages.cartPage.cartTable.removeProductByName(firstProductName)
  await pages.cartPage.cartTable.removeProductByName(secondProductName)

  // 5. Verify that product is removed from the cart
  await pages.cartPage.cartTable.expectProductRemoved(firstProductName)
  await pages.cartPage.cartTable.expectProductRemoved(secondProductName)
})