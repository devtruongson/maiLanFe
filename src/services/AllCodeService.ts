import { AxiosResponse } from 'axios';
import { IAllCode, IResponse } from '../utils/interface';
import axios from '../../axios';

export const getAllCodeByType = async (type: string = 'ALL'): Promise<IResponse<IAllCode[]>> => {
    try {
        const data: AxiosResponse<IResponse<IAllCode[]>> = await axios.get(`/all-code/${type}`);
        return data.data;
    } catch (error) {
        throw error;
    }
};
