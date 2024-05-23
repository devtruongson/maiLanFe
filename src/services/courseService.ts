import axios from '../../axios';
import { AxiosResponse } from 'axios';
import { ICourse, IDataGet, IResponse, IStudentBooking, IStudentCourse } from '../utils/interface';
import { configHeaderAxios } from './tokenService';

export const getCourseService = async ({
    trainingId,
    page = 1,
    pageSize = 3,
}: {
    trainingId: number;
    page: number;
    pageSize: number;
}): Promise<IResponse<IDataGet<ICourse[] | []>>> => {
    try {
        const data: AxiosResponse<IResponse<IDataGet<ICourse[]>>> = await axios.get(
            `/course/student?page=${page}&pageSize=${pageSize}&trainingId=${trainingId}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const studentBookingCourseService = async (body: IStudentBooking): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.post(
            `/calendar/student-booking`,
            { ...body },
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const getCourseByStudentService = async ({
    page,
    pageSize,
    studentId,
}: {
    page: number;
    pageSize: number;
    studentId: number;
}): Promise<IResponse<IDataGet<IStudentCourse[]>>> => {
    try {
        const data: AxiosResponse<IResponse<IDataGet<IStudentCourse[]>>> = await axios.get(
            `/course/student-course?page=${page}&pageSize=${pageSize}&studentId=${studentId}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};
