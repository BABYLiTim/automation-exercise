import { expect, Locator, Page } from '@playwright/test'


export class AuthPage{
    readonly page: Page
    readonly emailFieldLogin: Locator
    readonly passwordFieldLogin: Locator
    readonly loginButton: Locator
    readonly nameFieldSignup: Locator
    readonly emailFieldSignup: Locator
    readonly signupButton: Locator
    readonly loginForm: Locator
    readonly errorMessage: Locator

    constructor(page: Page){
        this.page = page
        this.emailFieldLogin = this.page.locator('.login-form').getByPlaceholder('Email Address')
        this.passwordFieldLogin = this.page.getByPlaceholder('Password')
        this.loginButton = this.page.getByRole('button', {name: 'Login'})
        this.nameFieldSignup = this.page.getByPlaceholder('Name')
        this.emailFieldSignup = this.page.locator('.signup-form').getByPlaceholder('Email Address')
        this.signupButton = this.page.getByRole('button', {name: 'Signup'})
        this.loginForm = this.page.locator('.login-form')
        this.errorMessage = this.page.getByText('Your email or password is incorrect!')
    }

    async signup(name: string, email: string){
        await this.nameFieldSignup.fill(name)
        await this.emailFieldSignup.fill(email)
        await this.signupButton.click()
    }

    async login(email: string, password: string){
        await this.emailFieldLogin.fill(email)
        await this.passwordFieldLogin.fill(password)
        await this.loginButton.click()
    }

    async expectLoginForm(){
        await expect(this.loginForm).toBeVisible()
    }

    async expectErrorMessage(){
        await expect(this.errorMessage).toBeVisible()
    }
}