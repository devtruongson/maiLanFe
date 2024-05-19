import { createSlice } from '@reduxjs/toolkit';
import { IAuthSlice } from '../../utils/interface';

const initState: IAuthSlice = {
    isLogin: false,
    role: null,
};

export const authSlice = createSlice({
    initialState: initState,
    name: 'authSlice',
    reducers: {
        loginSuccess(state: IAuthSlice, action) {
            const stateClone = {
                ...state,
            };
            stateClone.isLogin = true;
            stateClone.role = action.payload.user.role;
            return stateClone;
        },

        logoutAction(state: IAuthSlice) {
            state.isLogin = false;
            state.role = null;
        },
    },
});

export const { loginSuccess, logoutAction } = authSlice.actions;

export default authSlice.reducer;
