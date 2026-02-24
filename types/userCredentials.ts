import { Country } from "./country"

export interface UserCredentials {
    email: string
    password: string
    userDetails: {
        firstName: string
        lastName: string
        address: string
        country: Country
        mobile: string
    }
}