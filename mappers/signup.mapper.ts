import { SignupData } from '../types/signupData'
import { AddressData } from '../types/addressData'

export function mapSignupToAddress(data: SignupData): AddressData {
  return {
    gender: data.gender,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    country: data.country,
    mobile: data.mobile
  }
}