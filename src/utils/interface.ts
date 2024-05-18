import { HttpStatusCode } from 'axios';

export interface IPayloadJwt {
    id: number;
    email: string;
    role: number;
    role_detail: string;
    phoneNumber: string;
    is_login_social: boolean;
}

export interface IAllCode {
    id: number;
    type: string;
    title: string;
    code: string;
}

export interface IResponse<T> {
    code: HttpStatusCode;
    data: T;
    msg: string;
}
