import { Gender } from './gender'
import { Country } from './country'

export type AddressData = {
    gender: Gender
    firstName: string
    lastName: string
    address: string
    country: Country
    mobile: string
}