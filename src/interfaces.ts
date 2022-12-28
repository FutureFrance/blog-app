import { UserInstance } from './models/user';

export interface IUser {
    id: string,
    name: string,
    email: string,
    password: string,
    is_admin: boolean
}

export interface ITokens {
    accessToken: string,
    refreshToken: string
}

export interface ITokenData {
    id: string,
    role: number // admin=286 or user=333 
}

export interface IRegistrationData {
    user: UserInstance,
    tokens: ITokens
}