import axios from '../../axios';
import { AxiosResponse } from 'axios';
import { configHeaderAxios } from './tokenService';
import { IDataGet, IExam, IResponse, TStatusExam } from '../utils/interface';

interface IGetExam {
    page: number;
    pageSize: number;
    studentId: number;
    isComplated: boolean;
}

export const getExamService = async (
    body: Partial<IGetExam>,
    //     {
    //     page,
    //     pageSize,
    //     studentId,
    //     isComplated,
    // }: {
    //     page: number;
    //     pageSize: number;
    //     studentId: number;
    //     isComplated: boolean;
    // }
): Promise<IResponse<IDataGet<IExam[]>>> => {
    try {
        const data: AxiosResponse<IResponse<IDataGet<IExam[]>>> = await axios.get(
            `/exam/student?page=${body.page}&pageSize=${body.pageSize}&studentId=${body.studentId}&isComplated=${body.isComplated}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const getExamStudentService = async ({ studentId }: { studentId: number }): Promise<IResponse<IExam[]>> => {
    try {
        const data: AxiosResponse<IResponse<IExam[]>> = await axios.get(`/exam/student-desc?studentId=${studentId}`);
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
            `/exam/score`,
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
    class: number;
    course_code: string;
}

export const CreateExamService = async (body: Partial<IExamCreate>): Promise<IResponse<number>> => {
    try {
        const data: AxiosResponse<IResponse<number>> = await axios.post(`/exam`, { ...body }, configHeaderAxios());
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const deleteExamService = async (id: number): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.delete(`/exam/${id}`, configHeaderAxios());
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const getAllExams = async (
    page: number,
    pageSize: number,
    teacherId?: number,
): Promise<IResponse<IDataGet<IExam[]>>> => {
    try {
        const data: AxiosResponse<IResponse<IDataGet<IExam[]>>> = await axios.get(
            `/exam/teacher?page=${page}&pageSize=${pageSize}&teacherId=${teacherId}`,
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const changeStatusExamService = async (status: TStatusExam, id: number): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.patch(
            `/exam/change-status?status=${status}&id=${id}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const changeLevelExam = async (id: number, level: number): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.put(
            `/exam/level?id=${id}&level=${level}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const searchExamService = async (
    textSearch: string,
    page: number,
    pageSize: number,
): Promise<IResponse<IDataGet<IExam[]>>> => {
    try {
        const data: AxiosResponse<IResponse<IDataGet<IExam[]>>> = await axios.get(
            `/exam/search?textSearch=${textSearch}&page=${page}&pageSize=${pageSize}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};
