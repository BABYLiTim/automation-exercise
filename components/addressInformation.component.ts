import { Page, Locator } from '@playwright/test'
import { Country } from '../types/country'

export class AddressInformationComponent {
  readonly page: Page

  readonly firstName: Locator
  readonly lastName: Locator
  readonly company: Locator
  readonly address: Locator
  readonly country: Locator
  readonly state: Locator
  readonly city: Locator
  readonly zipcode: Locator
  readonly mobileNumber: Locator

  constructor(page: Page) {
    this.page = page

    this.firstName = page.locator('#first_name')
    this.lastName = page.locator('#last_name')
    this.company = page.locator('#company')
    this.address = page.locator('#address1')
    this.country = page.locator('#country')
    this.state = page.locator('#state')
    this.city = page.locator('#city')
    this.zipcode = page.locator('#zipcode')
    this.mobileNumber = page.locator('#mobile_number')
  }

  async fillAddressInfo(data: {
    firstName: string
    lastName: string
    company: string
    address: string
    country: Country
    state: string
    city: string
    zipcode: string
    mobile: string
  }) {
    await this.firstName.fill(data.firstName)
    await this.lastName.fill(data.lastName)
    await this.company.fill(data.company)
    await this.address.fill(data.address)
    await this.country.selectOption(data.country)
    await this.state.fill(data.state)
    await this.city.fill(data.city)
    await this.zipcode.fill(data.zipcode)
    await this.mobileNumber.fill(data.mobile)
  }
}