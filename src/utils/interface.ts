import { HttpStatusCode } from 'axios';

export interface IPayloadJwt {
    id: number;
    email: string;
    role: number;
    role_detail: string;
    phoneNumber: string;
    is_login_social: boolean;
}

export interface IAuthSlice {
    isLogin: boolean;
    role: string | null;
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

export interface IDataGet<T> {
    items: T;
    meta: {
        currentPage: number;
        totalIteams: number;
        totalPages: number;
    };
}

export interface ICourse {
    id: number;
    title: string;
    code: string;
    is_free: boolean;
    is_try_learning: boolean;
    price: string;
    thumbnail: string;
    training_sector: number;
    discount: string;
    createdAt: string;
    updatedAt: string;
}
