import { Locator } from "@playwright/test";


export class CheckoutPopUp {
    readonly root: Locator
    readonly registerLoginLink: Locator
    readonly continueOnCartButton: Locator

    constructor(root: Locator) {
        this.root = root
        this.registerLoginLink = root.getByRole('link', {name: 'Register / Login'})
        this.continueOnCartButton = root.getByRole('button', {name: 'Continue On Cart'})
    }

    async openRegisterLogin() {
        await this.registerLoginLink.click()
    }
}