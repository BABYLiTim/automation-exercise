import { Locator, expect } from '@playwright/test'
import { Gender } from '../types/gender'
import { Country } from '../types/country'


export class DeliveryAddress {
    readonly root: Locator
    readonly title: Locator
    readonly name: Locator
    readonly address: Locator
    readonly country: Locator
    readonly phoneNumber: Locator

    constructor(root: Locator) {
        this.root = root
        this.title = root.getByRole('heading', {name: 'Your delivery address'})
        this.name = root.locator('.address_firstname')
        this.address = root.locator('.address_address1').nth(1)
        this.country = root.locator('.address_country_name')
        this.phoneNumber = root.locator('.address_phone')
    }

    async expectDeliveryAddress(data: {
       gender: Gender
       firstName: string
       lastName: string
       address: string
       country: Country
       mobile: string 
    }) {
        expect (this.name).toContainText(`${data.firstName} ${data.lastName}`)
        expect (this.address).toContainText(data.address)
        expect (this.country).toContainText(data.country)
        expect (this.phoneNumber).toContainText(data.mobile)
    }
}