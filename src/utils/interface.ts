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
