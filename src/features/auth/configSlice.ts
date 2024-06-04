import { createSlice } from '@reduxjs/toolkit';

interface IState {
    isReload: boolean;
    day: number;
}

const initState: IState = {
    isReload: true,
    day: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
};

export const configSlice = createSlice({
    initialState: initState,
    name: 'configSlice',
    reducers: {
        reloadAction(state) {
            state.isReload = !state.isReload;
        },
        setDayAction(state, action) {
            state.day = action.payload;
        },
    },
});

export const { reloadAction, setDayAction } = configSlice.actions;

export default configSlice.reducer;
