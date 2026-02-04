import { expect, Locator, Page } from '@playwright/test'
import { UserCredentials } from '../types/userCredentials'


export class ContactUsPage{
    readonly page: Page
    readonly getInTouchHeading: Locator
    readonly nameField: Locator
    readonly emailField: Locator
    readonly subjectField: Locator
    readonly messageField: Locator
    readonly fileInput: Locator
    readonly submit: Locator
    readonly successMessage: Locator
    readonly homeButton: Locator

    constructor(page: Page){
        this.page = page
        this.getInTouchHeading = this.page.getByRole('heading', {name: 'Get In Touch'})
        this.nameField = this.page.getByPlaceholder('Name')
        this.emailField = this.page.locator('#contact-us-form').getByPlaceholder('Email')
        this.subjectField = this.page.getByPlaceholder('Subject')
        this.messageField = this.page.getByPlaceholder('Your Message Here')
        this.fileInput = this.page.locator('input[type="file"]')
        this.submit = this.page.getByRole('button', {name: 'submit'})
        this.successMessage = this.page.getByText('Success! Your details have been submitted successfully.')
        this.homeButton = this.page.getByRole('link', {name: 'Home'})
    }

    async fillContactForm(user: UserCredentials, subject: string, message: string){
        await this.nameField.fill(user.name)
        await this.emailField.fill(user.email)
        await this.subjectField.fill(subject)
        await this.messageField.fill(message)
    }

    async uploadFile(filePath: string): Promise<void> {
        await this.fileInput.setInputFiles(filePath);
    }

    async submitForm(){
        await this.submit.click()
    }
}