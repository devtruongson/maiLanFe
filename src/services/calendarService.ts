import axios from '../../axios';
import { AxiosResponse } from 'axios';
import { ICalendar, ICalendarTeacher, ICreateTeacherBooking, IDataGet, IResponse } from '../utils/interface';
import { configHeaderAxios } from './tokenService';

export const getCalendarService = async (): Promise<IResponse<ICalendar[]>> => {
    try {
        const data: AxiosResponse<IResponse<ICalendar[]>> = await axios.get(`/calendar`);
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

export const getCalendarBookingService = async (
    idTeacher: number = 0,
    date: number = 0,
): Promise<IResponse<ICalendarTeacher[]>> => {
    try {
        const data: AxiosResponse<IResponse<ICalendarTeacher[]>> = await axios.get(
            `/calendar/book/${idTeacher}?day=${date}`,
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
    isNotStudent: string = 'false',
): Promise<IResponse<IDataGet<ICalendarTeacher[]>>> => {
    try {
        const data: AxiosResponse<IResponse<IDataGet<ICalendarTeacher[]>>> = await axios.get(
            `/calendar/book-exam?page=${page}&pageSize=${pageSize}&idTeacher=${idTeacher}&isNotStudent=${isNotStudent}`,
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

export const addStudentToCalendarTeacher = async (idStudent: number, idCalendar: number): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.patch(
            `/calendar?idStudent=${idStudent}&idCalendar=${idCalendar}`,
            configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};
