import { Gender } from './gender'
import { Country } from './country'

export type SignupData = {
    gender: Gender
    password: string
    dateOfBirth: {
        day: string
        month: string
        year: string
    }
    firstName: string
    lastName: string
    company: string
    address: string
    country: Country
    state: string
    city: string
    zipcode: string
    mobile: string
}