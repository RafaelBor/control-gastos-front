import { User } from "./user.interface";

export interface LoginResponse {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    userData: User;
    token:    string;
}

