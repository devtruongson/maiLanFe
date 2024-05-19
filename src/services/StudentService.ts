import { AxiosResponse } from 'axios';
import { ILogin, IRegister, IResponse, IStudent, ITokens } from '../utils/interface';
import axios from '../../axios';

export const loginStudent = async (
    body: ILogin,
): Promise<
    IResponse<{
        user: IStudent;
        tokens: ITokens;
    }>
> => {
    try {
        const data: AxiosResponse<
            IResponse<{
                user: IStudent;
                tokens: ITokens;
            }>
        > = await axios.post(`/student/login`, {
            ...body,
        });
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const registerStudent = async (body: IRegister): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.post(`/student/register`, {
            ...body,
        });
        return data.data;
    } catch (error) {
        throw error;
    }
};
