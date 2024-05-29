import axios from '../../axios';
import { AxiosResponse } from 'axios';
import { configHeaderAxios } from './tokenService';
import { IParent, IParentAdd, IParentUpdate, IResponse } from '../utils/interface';

export const getParentService = async (id: number): Promise<IResponse<IParent[]>> => {
    try {
        const data: AxiosResponse<IResponse<IParent[]>> = await axios.get(`/parent/${id}`, configHeaderAxios());
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const addParentService = async (body: IParentAdd): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.post(`/parent`, { ...body }, configHeaderAxios());
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const updateInfoParentService = async (body: IParentUpdate): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.put(`/parent`, { ...body }, configHeaderAxios());
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const deleteInfoParentService = async (id: number): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.delete(`/parent/${id}`, configHeaderAxios());
        return data.data;
    } catch (error) {
        throw error;
    }
};
