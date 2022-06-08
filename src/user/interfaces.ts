export enum UserType {
    ADMIN = "admin",
    PUPILY = "pupily",
    SPONSOR = "sponsor",
}

export interface CreateUserPayload {
    userName: string;
    password: string;
    type: UserType;
}

export interface EditUserPayload {
    userName: string;
}

export interface EditPasswordUserPayload {
    oldPassword: string;
    newPassword: string;
}

export interface LoginUserPayload {
    userName: string;
    password: string;
}
