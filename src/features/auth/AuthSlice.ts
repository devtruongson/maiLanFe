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
        loginSuccess(state: IAuthBuild, action: PayloadAction<IAuthBuild>) {
            const stateClone = {
                ...state,
            };
            stateClone.auth.isLoginIn = true;
            stateClone.auth.data = action.payload.auth.data;
            stateClone.token = action.payload.token;
            return stateClone;
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
