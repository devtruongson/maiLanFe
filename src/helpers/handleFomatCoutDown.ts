import { ICountDown } from '../utils/interface';

export const handleFomatCountDown = (time: number): ICountDown => {
    const minute: number = Math.floor(time / 60);
    const second: number = time % 60;
    return {
        minute: minute,
        second: second,
    };
};
