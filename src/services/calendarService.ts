import axios from '../../axios';
import { AxiosResponse } from 'axios';
import { ICalendar, ICalendarTeacher, ICreateTeacherBooking, IDataGet, IResponse, TStatus } from '../utils/interface';
import { configHeaderAxios } from './tokenService';

export const getCalendarService = async (): Promise<IResponse<ICalendar[]>> => {
    try {
        const data: AxiosResponse<IResponse<ICalendar[]>> = await axios.get(`/calendar`);
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const getCalendarBookingByStudent = async (email: string): Promise<IResponse<ICalendarTeacher>> => {
    try {
        const data: AxiosResponse<IResponse<ICalendarTeacher>> = await axios.get(
            `/calendar/student?email=${email}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const teacherBookingService = async (body: ICreateTeacherBooking): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.post(`/calendar/book`, { ...body });
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const getCalendarBookingService = async (): Promise<IResponse<ICalendarTeacher[]>> => {
    try {
        const data: AxiosResponse<IResponse<ICalendarTeacher[]>> = await axios.get(
            `/calendar/all`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const unbookingService = async (timeStart: string): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.delete(
            `/calendar/unbooking?timeStart=${timeStart}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const getCalendarConfirmed = async (
    page: number,
    pageSize: number,
    idTeacher: number,
): Promise<IResponse<IDataGet<ICalendarTeacher[]>>> => {
    try {
        const data: AxiosResponse<IResponse<IDataGet<ICalendarTeacher[]>>> = await axios.get(
            `/calendar/book-exam?page=${page}&pageSize=${pageSize}&idTeacher=${idTeacher}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const searchCalendarService = async (textSearch: string): Promise<IResponse<ICalendarTeacher[]>> => {
    try {
        const data: AxiosResponse<IResponse<ICalendarTeacher[]>> = await axios.get(
            `/calendar/search?textSearch=${textSearch}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const addStudentToCalendarTeacher = async (
    idStudent: number,
    idCalendar: number,
    status: TStatus,
): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.patch(
            `/calendar?idStudent=${idStudent}&idCalendar=${idCalendar}&status=${status}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const changeStatusStudent = async (
    status: TStatus,
    idUser: number,
    idCalendar: number,
    isCancel?: string,
): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.patch(
            `/calendar/change-status?status=${status}&id=${idUser}&idCalendar=${idCalendar}&isCancel=${isCancel}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};
