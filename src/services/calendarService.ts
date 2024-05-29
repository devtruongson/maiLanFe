import axios from '../../axios';
import { AxiosResponse } from 'axios';
import { ICalendar, ICalendarTeacher, IResponse } from '../utils/interface';
// import { configHeaderAxios } from './tokenService';

export const getCalendarService = async (): Promise<IResponse<ICalendar[]>> => {
    try {
        const data: AxiosResponse<IResponse<ICalendar[]>> = await axios.get(`/calendar`);
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const teacherBookingService = async (body: ICalendarTeacher): Promise<IResponse<null>> => {
    try {
        const data: AxiosResponse<IResponse<null>> = await axios.post(`/calendar/book`, { ...body });
        return data.data;
    } catch (error) {
        throw error;
    }
};
