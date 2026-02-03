import { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'


export class HomePage{
    readonly page: Page
    readonly home: Locator
    readonly products: Locator
    readonly cart: Locator
    readonly signupLogin: Locator
    readonly testCases: Locator
    readonly apiTesting: Locator
    readonly videoTutorials: Locator
    readonly contactUs: Locator

    readonly deleteAccountButton: Locator
    readonly logoutButton: Locator
    readonly accountDeletedHeading: Locator
    readonly continueButton: Locator

    constructor(page: Page){
        this.page = page
        this.home = this.page.getByRole('link', {name: ' Home'})
        this.products = this.page.getByRole('link', {name: 'Products'})
        this.cart = this.page.getByRole('link', {name: 'Cart'})
        this.signupLogin = this.page.getByRole('link', {name: 'Signup / Login'})
        this.testCases = this.page.getByRole('link', {name: 'Test Cases'})
        this.apiTesting = this.page.getByRole('link', {name: 'API Testing'})
        this.videoTutorials = this.page.getByRole('link', {name: 'Video Tutorials'})
        this.contactUs = this.page.getByRole('link', {name: 'Contact us'})
        this.deleteAccountButton = this.page.getByRole('link', {name: 'Delete Account'})
        this.accountDeletedHeading = this.page.getByRole('heading', {name: 'Account Deleted!'})
        this.continueButton = this.page.getByRole('link', {name: 'Continue'})
        this.logoutButton = this.page.getByRole('link', {name: 'Logout'})
    }

    async expectAccountDeleted(){
        await expect(this.accountDeletedHeading).toBeVisible()
    }

    async expectHomePage(){
        await expect(this.home).toBeVisible()
    }

    async expectUserLoggedIn(username: string){
        await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible()
    }

    async continueAfterAccountDeletion() {
        await this.continueButton.click()
    }

    async openHomePage(){
        await this.home.click()
    }

    async openProductsPage(){
        await this.products.click()
    }

    async openCartPage(){
        await this.cart.click()
    }

    async openSignupLoginPage(){
        await this.signupLogin.click()
    }

    async openTestCasesPage(){
        await this.testCases.click()
    }

    async openApiTestingPage(){
        await this.apiTesting.click()
    }

    async openVideoTutorials(){
        await this.videoTutorials.click()
    }

    async openContactUs(){
        await this.contactUs.click()
    }

    async deleteAccount(){
        await this.deleteAccountButton.click()
    }

    async logout(){
        await this.logoutButton.click()
    }
}