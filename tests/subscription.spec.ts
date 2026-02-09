import { test, expect } from './fixtures/pages'
import { users } from '../test-data/users'


test ('User can subscribe with valid email from home page', async ({pages}) => {
    const user = users.valid

    await pages.home.expectHomePage()
    await pages.home.subscription.expectSubscriptionSectionVisible()

    await pages.home.subscription.submitSubscription(user.email)
    await pages.home.subscription.expectSuccessMessage()
})

test('User can subscribe with valid email from cart page', async ({pages}) => {
    const user = users.valid

    await pages.home.expectHomePage()
    await pages.cartPage.open()

    await pages.cartPage.subscription.submitSubscription(user.email)
    await pages.cartPage.subscription.expectSuccessMessage()
})