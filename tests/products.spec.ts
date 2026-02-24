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

test('User can Register while Checkout', async ({pages}) => {
  const signupData = buildSignupData()
  const deliveryAddress = mapSignupToAddress(signupData)
  const cardDetails = buildCardDetails(signupData.firstName)

  // Verify that home page is visible
  await pages.home.expectHomePage()

  // Add products to cart
  const firstProduct = await pages.home.getProductCard(0)
  const firstProductName = await firstProduct.getName()

  const secondProduct = await pages.home.getProductCard(1)
  const secondProductName = await secondProduct.getName()

  await firstProduct.addToCart()
  await pages.productsPage.addedToCartPopUp.continueShopping()

  await secondProduct.addToCart()
  await pages.productsPage.addedToCartPopUp.viewCart()

  // Verify that cart page is displayed
  await pages.cartPage.expectCartPage()

  // Click Proceed to checkout
  await pages.cartPage.proceedToCheckout()

  await pages.cartPage.registerDuringCheckout(signupData)

  // Click 'Cart' button
  await pages.home.openCartPage()

  // Click 'Proceed to Checkout' button
  await pages.cartPage.proceedToCheckout()

  // Verify Address Details and review your order
  await pages.checkoutPage.deliveryAddress.expectDeliveryAddress(deliveryAddress)

  const items = await pages.checkoutPage.cartTable.getItems()

  expect (items[0].name).toContain(firstProductName)
  expect (items[1].name).toContain(secondProductName)

  // 15. Enter description in comment text area and click 'Place Order'
  await pages.checkoutPage.writeComment(faker.lorem.sentence())
  await pages.checkoutPage.placeOrder()

  // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
  await pages.paymentPage.paymentForm.fillPaymentForm(cardDetails)

  // 17. Click 'Pay and Confirm Order' button
  await pages.paymentPage.paymentForm.confirmOrder()

  // 18. Verify success message 'Your order has been placed successfully!'
  await pages.paymentPage.expectSuccessOrderMessage()

  // 19. Click 'Delete' account button
  await pages.home.deleteAccount()

  // 20. Verify 'Account deleted' and click 'Continue' button
  await pages.home.expectAccountDeleted()
  await pages.home.continueAfterAccountDeletion()
})

