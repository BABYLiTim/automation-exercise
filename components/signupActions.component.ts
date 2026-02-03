import { Page, Locator, expect } from '@playwright/test'

export class SignupActionsComponent {
  readonly page: Page
  readonly createAccountButton: Locator
  readonly accountCreatedHeading: Locator
  readonly continueButton: Locator

  constructor(page: Page) {
    this.page = page

    this.createAccountButton = page.getByRole('button', { name: 'Create Account' })
    this.accountCreatedHeading = page.getByRole('heading', { name: 'Account Created!' })
    this.continueButton = page.getByRole('link', { name: 'Continue' })
  }

  async submit() {
    await this.createAccountButton.click()
  }

  async expectAccountCreated() {
    await expect(this.accountCreatedHeading).toBeVisible()
  }

  async continue() {
    await this.continueButton.click()
  }
}
