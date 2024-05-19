import { store } from '../features/store/store';
import { ITokens } from '../utils/interface';

export const getToken = () => {
    const tokens = store.getState().authSlice.token as ITokens | null;
    return tokens;
};

export const configHeaderAxios = () => {
    const tokens = getToken();

    return {
        headers: { Authorization: `Bearer ${tokens?.access_token}` },
    };
};
