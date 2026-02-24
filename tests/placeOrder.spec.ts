import { test, expect } from './fixtures/pages'
import { faker } from '@faker-js/faker'
import { mapSignupToAddress } from '../mappers/signup.mapper'
import { buildSignupData } from '../builders/signup.builder'
import { buildCardDetails } from '../builders/card.builder'
import { AuthPage } from '../page-objects/authPage'
import { users } from '../test-data/users'


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

test('User can Register before Checkout', async ({pages}) => {
  const signupData = buildSignupData()
  const deliveryAddress = mapSignupToAddress(signupData)
  const cardDetails = buildCardDetails(signupData.firstName)
  const firstName = faker.person.firstName()
  const email = faker.internet.email()

  // 3. Verify that home page is visible successfully
  await pages.home.expectHomePage()

  // 4. Click 'Signup / Login' button
  await pages.home.openSignupLoginPage()

  // 5. Fill all details in Signup and create account
  await pages.auth.signup(firstName, email)
  await pages.signup.createAccount(signupData)

  // 6. Verify 'Account created!' and click 'Continue' button
  await pages.signup.actions.expectAccountCreated()
  await pages.signup.actions.continue()

  // 7. Verify 'Logged in as username' at top
  await pages.home.expectUserLoggedIn(firstName)

  // 8. Add products to cart
  const firstProduct = await pages.home.getProductCard(0)
  const secondProduct = await pages.home.getProductCard(1)

  const firstProductName = await firstProduct.getName()
  const secondProductName = await secondProduct.getName()

  await firstProduct.addToCart()
  await pages.productsPage.addedToCartPopUp.continueShopping()

  await secondProduct.addToCart()
  await pages.productsPage.addedToCartPopUp.viewCart()

  // 10. Verify that cart page is displayed
  await pages.cartPage.expectCartPage()

  // 11. Click Proceed to Checkout
  await pages.cartPage.proceedToCheckout()

  // 12. Verify Address Details and Review Your Order
  await pages.checkoutPage.deliveryAddress.expectDeliveryAddress(deliveryAddress)

  const items = await pages.checkoutPage.cartTable.getItems()

  expect (items[0].name).toContain(firstProductName)
  expect (items[1].name).toContain(secondProductName)

  // 13. Enter description in comment text area and click 'Place Order'
  await pages.checkoutPage.writeComment(faker.lorem.sentence())
  await pages.checkoutPage.placeOrder()

  // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
  await pages.paymentPage.paymentForm.fillPaymentForm(cardDetails)

  // 15. Click 'Pay and Confirm Order' button
  await pages.paymentPage.paymentForm.confirmOrder()

  // 16. Verify success message 'Your order has been placed successfully!'
  await pages.paymentPage.expectSuccessOrderMessage()

  // 17. Click 'Delete' account button
  await pages.home.deleteAccount()

  // 18. Verify 'Account deleted' and click 'Continue' button
  await pages.home.expectAccountDeleted()
  await pages.home.continueAfterAccountDeletion()
})

test('User can login and place an order', async ({pages}) => {
  const user = users.valid
  const cardDetails = buildCardDetails(user.userDetails.firstName)
  // 3. Verify that home page is visible successfully
  await pages.home.expectHomePage()

  // 4. Click 'Signup / Login' button
  await pages.home.openSignupLoginPage()

  // 5. Fill email, password and click 'Login' button
  await pages.auth.login(user)

  // 6. Verify 'Logged in as username' at top
  await pages.home.expectUserLoggedIn(user.userDetails.firstName)

  // 7. Add products to cart
  const firstProduct = await pages.home.getProductCard(0)
  const secondProduct = await pages.home.getProductCard(1)

  const firstProductName = await firstProduct.getName()
  const secondProductName = await secondProduct.getName()

  await firstProduct.addToCart()
  await pages.productsPage.addedToCartPopUp.continueShopping()

  await secondProduct.addToCart()
  await pages.productsPage.addedToCartPopUp.viewCart()

  // 9. Verify that cart page is displayed
  await pages.cartPage.expectCartPage()

  // 10. Click Proceed to Checkout
  await pages.cartPage.proceedToCheckout()

  // 11. Verify Address Details and Review Your Order
  await pages.checkoutPage.deliveryAddress.expectDeliveryAddress(user.userDetails)

  const items = await pages.checkoutPage.cartTable.getItems()

  expect (items[0].name).toContain(firstProductName)
  expect (items[1].name).toContain(secondProductName)

  // 12. Enter description in comment text area and click 'Place Order'
  await pages.checkoutPage.writeComment(faker.lorem.sentence())
  await pages.checkoutPage.placeOrder()

  // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
  await pages.paymentPage.paymentForm.fillPaymentForm(cardDetails)

  // 14. Click 'Pay and Confirm Order' button
  await pages.paymentPage.paymentForm.confirmOrder()

  // 15. Verify success message 'Your order has been placed successfully!'
  await pages.paymentPage.expectSuccessOrderMessage()
})
