import { User } from "./user.entity";

export enum UserType {
    ADMIN = "admin",
    PUPILY = "pupily",
    SPONSOR = "sponsor",
}

export interface CreateUserPayload {
    name: string;
    password: string;
    type: UserType;
}

export interface EditUserPayload {
    name: string;
}

export interface EditPasswordUserPayload {
    oldPassword: string;
    newPassword: string;
}

export interface LoginUserPayload {
    name: string;
    password: string;
}

export interface ResLoginUser {
    name: string;
    token: string;
    type: UserType;
    id: number;
}
