import axios from '../../axios';
import { AxiosResponse } from 'axios';
import { configHeaderAxios } from './tokenService';
import { IDataGet, IExam, IResponse } from '../utils/interface';

export const getExamService = async ({
    page,
    pageSize,
    studentId,
    isComplated,
}: {
    page: number;
    pageSize: number;
    studentId: number;
    isComplated: boolean;
}): Promise<IResponse<IDataGet<IExam[]>>> => {
    try {
        const data: AxiosResponse<IResponse<IDataGet<IExam[]>>> = await axios.get(
            `/exam/student?page=${page}&pageSize=${pageSize}&studentId=${studentId}&isComplated=${isComplated}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const getOneExamService = async (id: number, isCompleted: boolean): Promise<IResponse<IExam>> => {
    try {
        const data: AxiosResponse<IResponse<IExam>> = await axios.get(
            `/exam/get-one?id=${id}&isCompleted=${isCompleted}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const handleSubmitService = async ({
    listAnswer,
    examId,
}: {
    listAnswer: number[];
    examId: number;
}): Promise<IResponse<{ point: number }>> => {
    try {
        const data: AxiosResponse<IResponse<{ point: number }>> = await axios.put(
            `/exam//score`,
            { listAnswer: listAnswer, examId: examId },
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

interface IExamCreate {
    student_id: number;
    title: string;
    time_end: number;
    total_question: number;
    level: number;
    teacher_id: number;
}

export const CreateExamService = async (body: IExamCreate): Promise<IResponse<number>> => {
    try {
        const data: AxiosResponse<IResponse<number>> = await axios.post(`/exam`, { ...body }, configHeaderAxios());
        return data.data;
    } catch (error) {
        throw error;
    }
};
