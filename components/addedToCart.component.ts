import { Locator, expect } from '@playwright/test'


export class AddedToCartPopUp {
    readonly root: Locator
    readonly viewCartButton: Locator
    readonly continueShoppingButton: Locator

    constructor(root: Locator) {
        this.root = root
        this.viewCartButton = root.getByRole('link', {name: 'View Cart'})
        this.continueShoppingButton = root.getByRole('button', {name: 'Continue Shopping'})
    }

    async continueShopping() {
        await this.continueShoppingButton.click()
    }

    async viewCart(){
        await this.viewCartButton.click()
    }
}