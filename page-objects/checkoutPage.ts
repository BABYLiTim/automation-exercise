import { Locator, Page } from '@playwright/test'
import { DeliveryAddress } from '../components/deliveryAddress.component'
import { CartTable } from '../components/cartTable.component'


export class CheckoutPage {
    readonly page: Page
    readonly commentField: Locator
    readonly placeOrderButton: Locator
    readonly cartTable: CartTable

    readonly deliveryAddress: DeliveryAddress

    constructor(page: Page) {
        this.page = page
        this.commentField = page.locator('textarea[name="message"]')
        this.placeOrderButton = page.getByRole('link', {name: 'Place Order'})

        this.deliveryAddress = new DeliveryAddress(page.locator('#address_delivery'))
        this.cartTable = new CartTable(page.locator('.table-condensed'))
    }

    async writeComment(comment: string){
        await this.commentField.fill(comment)
    }

    async placeOrder(){
        await this.placeOrderButton.click()
    }
}