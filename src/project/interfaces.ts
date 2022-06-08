import { User } from "src/user/user.entity";

export interface CreateProjectPayload {
    name: string;
    user: User;
}

export interface EditProjectPayload {
    name: string;
}
