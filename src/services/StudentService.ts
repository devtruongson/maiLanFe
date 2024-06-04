import { AxiosResponse } from 'axios';
import {
    ICalendarTeacher,
    IDataGet,
    IExam,
    ILogin,
    IRegister,
    IResponse,
    IStudent,
    ITokens,
    TStudent,
} from '../utils/interface';
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
        > = await axios.post(`/user/login`, {
            ...body,
        });
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const registerStudent = async (body: IRegister): Promise<IResponse<IStudent>> => {
    try {
        const data: AxiosResponse<IResponse<IStudent>> = await axios.post(`/student/register`, {
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

export const getAllStudentService = async (
    page: number,
    pageSize: number,
    type: TStudent,
): Promise<IResponse<IDataGet<IStudent[]>>> => {
    try {
        const data: AxiosResponse<IResponse<IDataGet<IStudent[]>>> = await axios.get(
            `/student?page=${page}&limit=${pageSize}&course_code=${type}`,
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const getCountUser = async (type: string = 'all') => {
    try {
        const data = await axios.get(`/student/count?type=${type}`);
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const getOneStudent = async (
    id: number,
): Promise<IResponse<{ student: IStudent; exam: IExam[]; calendar: ICalendarTeacher[] }>> => {
    try {
        const data: AxiosResponse<IResponse<{ student: IStudent; exam: IExam[]; calendar: ICalendarTeacher[] }>> =
            await axios.get(`/student/one/${id}`);
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const getAddressVercel = async (url: string) => {
    return fetch(url)
        .then((res) => res.json())
        .then((data) => data);
};

export const createInfoStudentService = async () => {};
