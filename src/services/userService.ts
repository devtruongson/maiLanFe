import { AxiosResponse } from 'axios';
import { IResponse, IUser } from '../utils/interface';
import axios from '../../axios';

export const getAllUserByType = async (type: string = ''): Promise<IResponse<IUser[]>> => {
    try {
        const data: AxiosResponse<IResponse<IUser[]>> = await axios.get(`/user/all-by-type?type=${type}`);
        return data.data;
    } catch (error) {
        throw error;
    }
};
