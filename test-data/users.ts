import { UserCredentials } from '../types/userCredentials'

export const users = {
  valid: {
    email: process.env.USER_EMAIL_VALID!,
    password: process.env.USER_PASSWORD_VALID!,
    name: 'Alex',
  } satisfies UserCredentials,

  invalid: {
    email: 'wrong@mail.com',
    password: 'wrongPassword',
    name: 'Unknown',
  } satisfies UserCredentials,
}
