import { Locator, Page } from "@playwright/test";
import { SubscriptionComponent } from "../components/subscription.component";
import { expect } from "@playwright/test";


export class CartPage{
    readonly page: Page
    readonly subscription: SubscriptionComponent

    constructor(page: Page){
        this.page = page
        this.subscription = new SubscriptionComponent(page.locator('#footer'))
    }

    async open(){
        await this.page.goto('/view_cart')
    }
}