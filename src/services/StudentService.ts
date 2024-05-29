import { AxiosResponse } from 'axios';
import { ILogin, IRegister, IResponse, IStudent, ITokens } from '../utils/interface';
import axios from '../../axios';
import { configHeaderAxios } from './tokenService';

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

export const registerStudent = async (body: IRegister): Promise<IResponse<IRegister>> => {
    try {
        const data: AxiosResponse<IResponse<IRegister>> = await axios.post(`/student/register`, {
            ...body,
        });
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const gretInfoStudentService = async (emailStudent: string): Promise<IResponse<IStudent>> => {
    try {
        const data: AxiosResponse<IResponse<IStudent>> = await axios.get(
            `/student/${emailStudent}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const updateInfoStudentService = async (body: IStudent): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.put('/student', { ...body }, configHeaderAxios());

        return data.data;
    } catch (error) {
        throw error;
    }
};

export const createInfoStudentService = async () => {};
