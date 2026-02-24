import {Locator} from '@playwright/test'

export class PaymentForm {
    readonly root: Locator
    readonly nameOnCard: Locator
    readonly cardNumber: Locator
    readonly cvc: Locator
    readonly expirationMonth: Locator
    readonly expirationYear: Locator
    readonly confirmOrderButton: Locator

    constructor(root: Locator){
        this.root = root
        this.nameOnCard = root.locator('input[name="name_on_card"]')
        this.cardNumber = root.locator('input[name="card_number"]')
        this.cvc = root.getByPlaceholder('ex. 311')
        this.expirationMonth = root.getByPlaceholder('MM')
        this.expirationYear = root.getByPlaceholder('YYYY')
        this.confirmOrderButton = root.getByRole('button', {name: 'Pay and Confirm Order'})
    }

    async fillPaymentForm(cardDetails: {
        name: string
        cardNumber: string
        cvc: string
        expirationMonth: string
        expirationYear: string
    }) {
        await this.nameOnCard.fill(cardDetails.name)
        await this.cardNumber.fill(cardDetails.cardNumber)
        await this.cvc.fill(cardDetails.cvc)
        await this.expirationMonth.fill(cardDetails.expirationMonth)
        await this.expirationYear.fill(cardDetails.expirationYear)
    }

    async confirmOrder(){
        await this.confirmOrderButton.click()
    }
}