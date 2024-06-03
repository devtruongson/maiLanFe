import { createSlice } from '@reduxjs/toolkit';

interface IState {
    isReload: boolean;
}

const initState: IState = {
    isReload: true,
};

export const configSlice = createSlice({
    initialState: initState,
    name: 'configSlice',
    reducers: {
        reloadAction(state) {
            state.isReload = !state.isReload;
        },
    },
});

export const { reloadAction } = configSlice.actions;

export default configSlice.reducer;
