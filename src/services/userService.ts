/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { IDataGet, IResponse, IUser } from '../utils/interface';
import axios from '../../axios';

export const getAllUserByType = async (type: string = '4'): Promise<IResponse<IUser[]>> => {
    try {
        const data: AxiosResponse<IResponse<IUser[]>> = await axios.get(`/user/all-by-type?type=${type}`);
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const getAllUser = async (
    type: string = '4',
    page?: number,
    pageSize?: number,
    day?: number,
): Promise<IResponse<IDataGet<IUser[]>>> => {
    try {
        const data: AxiosResponse<IResponse<IDataGet<IUser[]>>> = await axios.get(
            `/user/all?role=${type}&page=${page ? page : 1}&pageSize=${pageSize ? pageSize : 10000}&day=${
                day ? day : ''
            }`,
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (body: Partial<IUser>): Promise<IResponse<any>> => {
    try {
        const data: AxiosResponse<IResponse<any>> = await axios.post(`/user/create`, {
            ...body,
        });
        return data.data;
    } catch (error) {
        throw error;
    }
};
