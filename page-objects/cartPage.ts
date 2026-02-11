import { Locator, Page } from "@playwright/test";
import { SubscriptionComponent } from "../components/subscription.component";
import { CartTable } from "../components/cartTable.component";
import { expect } from "@playwright/test";


export class CartPage{
    readonly page: Page
    readonly subscription: SubscriptionComponent
    readonly cartTable: CartTable

    constructor(page: Page){
        this.page = page
        this.subscription = new SubscriptionComponent(page.locator('#footer'))
        this.cartTable = new CartTable(page.locator('#cart_info_table'))
    }

    async open(){
        await this.page.goto('/view_cart')
    }

    // async expectProductInTheCart(){
    //     await expect(this.product).toBeVisible()
    // }
}