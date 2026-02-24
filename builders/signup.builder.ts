import { faker } from '@faker-js/faker'
import { SignupData } from '../types/signupData'
import { Gender } from '../types/gender'
import { Country } from '../types/country'

export function buildSignupData(overrides: Partial<SignupData> = {}): SignupData {
  return {
    gender: Gender.Male,
    password: 'Test1234!',
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
    mobile: '1234567890',
    ...overrides
  }
}