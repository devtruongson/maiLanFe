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

            stateClone.value = action.payload;

            return stateClone;
        },
        resetCount(state: ICount) {
            const stateClone = {
                ...state,
            };

            stateClone.value = 0;

            return stateClone;
        },

        reduceCount(state) {
            const stateClone = {
                ...state,
            };

            stateClone.value = stateClone.value - 1;

            return stateClone;
        },
    },
});

export const { addCount, reduceCount, resetCount } = countSlice.actions;

export default countSlice.reducer;
