import { createSlice } from '@reduxjs/toolkit';

interface IState {
    isReload: boolean;
    day: number;
    dataOperate: {
        textSearch: string;
        idSelectOperate: number[];
    };
}

const initState: IState = {
    isReload: true,
    day: new Date(new Date().setHours(0, 0, 0, 0)).getTime(),
    dataOperate: {
        textSearch: '',
        idSelectOperate: [],
    },
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
        setTextSearchAction(state, action) {
            state.dataOperate.textSearch = action.payload;
        },
        setIdSelectOperate(state, action) {
            state.dataOperate.idSelectOperate = action.payload;
        },
    },
});

export const { reloadAction, setDayAction, setTextSearchAction, setIdSelectOperate } = configSlice.actions;

export default configSlice.reducer;
