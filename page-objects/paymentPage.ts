import { Locator, Page } from '@playwright/test'
import { PaymentForm } from '../components/payment.component'
import { expect } from '@playwright/test'


export class PaymentPage {
    readonly page: Page
    readonly paymentForm: PaymentForm
    readonly successOrderMessage: Locator

    constructor(page: Page){
        this.page = page
        this.paymentForm = new PaymentForm(page.locator('#payment-form'))
        this.successOrderMessage = page.getByText('Congratulations! Your order has been confirmed!')
    }

    async expectSuccessOrderMessage(){
        await expect(this.successOrderMessage).toBeVisible()
    }
}