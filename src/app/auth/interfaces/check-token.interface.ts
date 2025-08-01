import { User } from "./user.interface";

export interface checkTokenResponse extends Response{
    user: User,
    token: string
}