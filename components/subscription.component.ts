import { Page, Locator, expect } from '@playwright/test'


export class SubscriptionComponent {
    readonly root: Locator
    readonly title: Locator
    readonly emailField: Locator
    readonly submitButton: Locator
    readonly successMessage: Locator

    constructor(root: Locator) {
        this.root = root
        this.title = root.getByRole('heading', {name: 'Subscription'})
        this.emailField = root.locator('#susbscribe_email')
        this.submitButton = root.locator('#subscribe')
        this.successMessage = root.getByText('You have been successfully subscribed!')
    }

    async expectSubscriptionSectionVisible() {
        await expect (this.title).toBeVisible()
    }

    async submitSubscription (email: string) {
        await this.emailField.fill(email)
        await this.submitButton.click()
    }

    async expectSuccessMessage() {
        await expect (this.successMessage).toBeVisible()
    }
}