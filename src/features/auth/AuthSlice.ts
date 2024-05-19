import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthBuild } from '../../utils/interface';

const initState: IAuthBuild = {
    auth: {
        data: null,
        isLoginIn: false,
    },
    token: null,
};

export const authSlice = createSlice({
    initialState: initState,
    name: 'authSlice',
    reducers: {
        loginSuccess(state, action: PayloadAction<IAuthBuild>) {
            state.auth.isLoginIn = true;
            state.auth.data = action.payload.auth.data;
            state.token = action.payload.token;
        },

        logoutAction(state: IAuthBuild) {
            state.auth.isLoginIn = false;
            state.auth.data = null;
            state.token = null;
        },
    },
});

export const { loginSuccess, logoutAction } = authSlice.actions;

export default authSlice.reducer;
