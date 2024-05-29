import axios from '../../axios';
import { AxiosResponse } from 'axios';
import { ICalendar, ICalendarTeacher, ICreateTeacherBooking, IResponse } from '../utils/interface';
// import { configHeaderAxios } from './tokenService';

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
    idTeacher: number,
    date: number,
): Promise<IResponse<ICalendarTeacher[]>> => {
    try {
        const data: AxiosResponse<IResponse<ICalendarTeacher[]>> = await axios.get(
            `/calendar/book/${idTeacher}?day=${date}`,
            // configHeaderAxios(),
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
            // configHeaderAxios(),
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};
