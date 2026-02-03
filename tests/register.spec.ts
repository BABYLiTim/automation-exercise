import { test, expect } from './fixtures/pages'
import { faker } from '@faker-js/faker'
import { SignupData } from '../types/signupData'
import { Gender } from '../types/gender'
import { Country } from '../types/country'

test('Sign Up', async ({ pages }) => {
    const signupData: SignupData = {
        gender: Gender.Male,
        password: faker.internet.password(),
        dateOfBirth: {
            day: '15',
            month: '5',
            year: '1995'
        },
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        company: faker.company.name(),
        address: faker.location.streetAddress(),
        country: Country.Canada,
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobile: faker.phone.number()
    }

    await pages.home.openSignupLoginPage()
    await pages.auth.signup(faker.person.firstName(), faker.internet.email())

    // Create an Account
    await pages.signup.createAccount(signupData)
    await pages.signup.actions.expectAccountCreated()
    await pages.signup.actions.continue()

    // Delete an Account
    await pages.home.deleteAccount()
    await pages.home.expectAccountDeleted()
    await pages.home.continueAfterAccountDeletion()
})