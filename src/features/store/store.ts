import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import thunk from 'redux-thunk';
import persistStore from 'redux-persist/es/persistStore';
import authSlice from '../auth/AuthSlice';
import countSlice from '../count/countSlice';
import { Persistor } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
};

const authPersist = persistReducer(persistConfig, authSlice);
const countPersist = persistReducer(persistConfig, countSlice);

export const store = configureStore({
    reducer: {
        authSlice: authPersist,
        countSlice: countPersist,
    },
    middleware: [thunk],
});

export const persistor: Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
