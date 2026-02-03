import { Page } from '@playwright/test'
import { SignupData } from '../types/signupData'
import { AccountInformationComponent } from '../components/accountInformation.component'
import { AddressInformationComponent } from '../components/addressInformation.component'
import { SignupActionsComponent } from '../components/signupActions.component'

export class SignupPage {
  readonly page: Page
  readonly accountInfo: AccountInformationComponent
  readonly addressInfo: AddressInformationComponent
  readonly actions: SignupActionsComponent

  constructor(page: Page) {
    this.page = page
    this.accountInfo = new AccountInformationComponent(page)
    this.addressInfo = new AddressInformationComponent(page)
    this.actions = new SignupActionsComponent(page)
  }

  async createAccount(data: SignupData) {
    await this.accountInfo.fillAccountInfo(data)
    await this.addressInfo.fillAddressInfo(data)
    await this.actions.submit()
  }
}
