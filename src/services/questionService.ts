import axios from '../../axios';
import { AxiosResponse } from 'axios';
import { configHeaderAxios } from './tokenService';
import { IDataGet, IQuestion, IResponse } from '../utils/interface';

export const getQuestionService = async (
    page: number,
    pageSize: number,
    authorId: number,
    level: number,
    classId: number,
    course: string,
): Promise<IResponse<IDataGet<IQuestion[]>>> => {
    try {
        const data: AxiosResponse<IResponse<IDataGet<IQuestion[]>>> = await axios.get(
            `/question?page=${page}&pageSize=${pageSize}&authorId=${authorId}&level=${level}&classId=${classId}&course=${course}`,
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

// interface IDataCreate {
//     title: string;
//     suggest: string;
//     level: number;
//     author_id: number;
// }

export const createQuestionService = async (body: Partial<IQuestion>): Promise<IResponse<null>> => {
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

// answer

export const deleteAnswerService = async (id: number): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.delete(`/answer/${id}`, configHeaderAxios());
        return data.data;
    } catch (error) {
        throw error;
    }
};

interface IAnswerCreate {
    answer_title: string;
    is_right: boolean;
    question_id: number;
}

export const createAnswerService = async (body: IAnswerCreate): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.post(`/answer`, [{ ...body }], configHeaderAxios());
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const createExamQuestionService = async (
    examId: number,
    totalQuestion: number,
    level: number,
): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.post(
            `/exam_question/auto?examId=${examId}&totalQuestion=${totalQuestion}&level=${level}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};
