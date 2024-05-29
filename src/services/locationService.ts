import axios from '../../axios';
import { AxiosResponse } from 'axios';
import { ICommune, IDistrict, IProvince } from '../utils/interface';

export const GetProvinceService = async (): Promise<IProvince[]> => {
    try {
        const data: AxiosResponse<IProvince[]> = await axios.get(
            `https://vietnam-administrative-division-json-server-swart.vercel.app/province`,
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const GetDistrictService = async (idProvince: string): Promise<IDistrict[]> => {
    try {
        const data: AxiosResponse<IDistrict[]> = await axios.get(
            `https://vietnam-administrative-division-json-server-swart.vercel.app/district?idProvince=${idProvince}`,
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};

export const GetCommuneService = async (idDistrict: string): Promise<ICommune[]> => {
    try {
        const data: AxiosResponse<ICommune[]> = await axios.get(
            `https://vietnam-administrative-division-json-server-swart.vercel.app/commune?idDistrict=${idDistrict}`,
        );
        return data.data;
    } catch (error) {
        throw error;
    }
};
