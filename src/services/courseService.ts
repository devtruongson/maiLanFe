import axios from '../../axios';
import { AxiosResponse } from 'axios';
import { ICourse, IDataGet, IResponse } from '../utils/interface';
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
