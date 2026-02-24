import { UserCredentials } from '../types/userCredentials'
import { Country } from '../types/country'

export const users = {
  valid: {
    email: process.env.USER_EMAIL_VALID!,
    password: process.env.USER_PASSWORD_VALID!,
    userDetails: {
      firstName: 'Alex',
      lastName: 'Smith',
      address:'US, 5th Avenue',
      country: Country.US,
      mobile: '67356536735' }
  } satisfies UserCredentials,

  invalid: {
    email: 'wrong@mail.com',
    password: 'wrongPassword',
    userDetails: {
      firstName: 'Unknown',
      lastName: 'Unknown',
      address: 'Unknown',
      country: Country.US,
      mobile: 'Unknown'
    }
  } satisfies UserCredentials,
}
