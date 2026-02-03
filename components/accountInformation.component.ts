import { Page, Locator } from '@playwright/test'
import { Gender } from '../types/gender'

export class AccountInformationComponent {
  readonly page: Page

  readonly titleMr: Locator
  readonly titleMrs: Locator
  readonly password: Locator
  readonly dayOfBirth: Locator
  readonly monthOfBirth: Locator
  readonly yearOfBirth: Locator

  constructor(page: Page) {
    this.page = page

    this.titleMr = page.getByRole('radio', { name: 'Mr.' })
    this.titleMrs = page.getByRole('radio', { name: 'Mrs.' })
    this.password = page.locator('#password')
    this.dayOfBirth = page.locator('#days')
    this.monthOfBirth = page.locator('#months')
    this.yearOfBirth = page.locator('#years')
  }

  async fillAccountInfo(data: {
    gender: Gender
    password: string
    dateOfBirth: { day: string; month: string; year: string }
  }) {
    if (data.gender === Gender.Male) {
      await this.titleMr.check()
    } else {
      await this.titleMrs.check()
    }

    await this.password.fill(data.password)
    await this.dayOfBirth.selectOption(data.dateOfBirth.day)
    await this.monthOfBirth.selectOption(data.dateOfBirth.month)
    await this.yearOfBirth.selectOption(data.dateOfBirth.year)
  }
}
