import { Locator, Page } from "@playwright/test";
import { SubscriptionComponent } from "../components/subscription.component";
import { CartTable } from "../components/cartTable.component";
import { expect } from "@playwright/test";
import { CheckoutPopUp } from "../components/checkoutPopUp.component";
import { AuthPage } from "./authPage";
import { SignupPage } from "./signupPage";
import { faker } from '@faker-js/faker'
import { SignupData } from '../types/signupData'


export class CartPage{
    readonly page: Page
    readonly proccedToCheckoutButton: Locator

    readonly subscription: SubscriptionComponent
    readonly cartTable: CartTable
    readonly checkoutPopUp: CheckoutPopUp
    readonly auth: AuthPage
    readonly signup: SignupPage

    

    constructor(page: Page){
        this.page = page
        this.proccedToCheckoutButton = page.getByText('Proceed To Checkout')

        this.subscription = new SubscriptionComponent(page.locator('#footer'))
        this.cartTable = new CartTable(page.locator('#cart_info_table'))
        this.checkoutPopUp = new CheckoutPopUp(page.locator('.modal-content'))
        this.auth = new AuthPage(page)
        this.signup = new SignupPage(page)
    }

    async open(){
        await this.page.goto('/view_cart')
    }

    async expectCartPage(){
        expect(this.page).toHaveURL('/view_cart')
    }

    async proceedToCheckout(){
        await this.proccedToCheckoutButton.click()
    }

    async registerDuringCheckout(signupData: SignupData) {
        await this.checkoutPopUp.openRegisterLogin()
        await this.auth.signup(signupData.firstName, faker.internet.email())
        await this.signup.createAccount(signupData)
        await this.signup.actions.expectAccountCreated()
        await this.signup.actions.continue()
}
}