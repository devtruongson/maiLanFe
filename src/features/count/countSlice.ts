import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICount {
    value: number;
}

const initState: ICount = {
    value: 0,
};

export const countSlice = createSlice({
    initialState: initState,
    name: 'countSlice',
    reducers: {
        addCount(state: ICount, action: PayloadAction<number>) {
            const stateClone = {
                ...state,
            };

            console.log(action);

            stateClone.value = (stateClone.value + action.payload) as number;

            return stateClone;
        },

        truCount(state, action) {
            const stateClone = {
                ...state,
            };

            stateClone.value = stateClone.value - action.payload.value;

            return stateClone;
        },
    },
});

export const { addCount, truCount } = countSlice.actions;

export default countSlice.reducer;
