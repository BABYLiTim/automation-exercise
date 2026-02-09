import { test, expect } from './fixtures/pages'
import { users } from '../test-data/users'


test ('User can subscribe with valid email', async ({pages}) => {
    const user = users.valid

    await pages.home.expectHomePage()
    await pages.home.subscription.expectSubscriptionSectionVisible()

    await pages.home.subscription.submitSubscription(user.email)
    await pages.home.subscription.expectSuccessMessage()
})