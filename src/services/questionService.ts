import axios from '../../axios';
import { AxiosResponse } from 'axios';
import { configHeaderAxios } from './tokenService';
import { IDataGet, IQuestion, IResponse } from '../utils/interface';

export const getQuestionService = async (
    page: number,
    pageSize: number,
    authorId: number,
    level: number,
): Promise<IResponse<IDataGet<IQuestion[]>>> => {
    try {
        const data: AxiosResponse<IResponse<IDataGet<IQuestion[]>>> = await axios.get(
            `/question?page=${page}&pageSize=${pageSize}&authorId=${authorId}&level=${level}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const deleteQuestionService = async (id: number): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.delete(`/question/${id}`, configHeaderAxios());
        return data.data;
    } catch (error) {
        throw error;
    }
};

interface IDataCreate {
    title: string;
    suggest: string;
    level: number;
    author_id: number;
}

export const createQuestionService = async (body: IDataCreate): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.post(`/question`, { ...body }, configHeaderAxios());
        return data.data;
    } catch (error) {
        throw error;
    }
};

interface IDataUpdate {
    title: string;
    suggest: string;
    level: number;
    author_id: number;
    id: number;
}
export const updateQuestionService = async (body: IDataUpdate): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.put(`/question`, { ...body }, configHeaderAxios());
        return data.data;
    } catch (error) {
        throw error;
    }
};
