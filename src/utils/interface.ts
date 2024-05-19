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

export interface IAuthBuild {
    auth: {
        isLoginIn: boolean;
        data: {
            email: string;
            role_detail: string;
        } | null;
    };
    token: ITokens | null;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IStudent {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    birthday: string | null;
    gender: string | null;
    avatar: string | null;
    level: string | null;
    address: number;
    address_detail: string | null;
    createdAt: string;
    updatedAt: string;
    AllCodeData: IAllCode;
    ParentData: IParentData;
}

export interface IParentData {
    id: number | null;
    fullName: string | null;
    association_for_student: string | null;
    AssociationData: IAssociationData;
}

export interface IAssociationData {
    id: number | null;
    type: string | null;
    title: string | null;
    code: string | null;
}

export interface ITokens {
    access_token: string;
    refresh_token: string;
}
