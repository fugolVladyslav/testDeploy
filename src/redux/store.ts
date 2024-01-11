import { configureStore } from '@reduxjs/toolkit';

import mainReducer from './reducers/mainReducer';
import { authAPI } from '../services/auth';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },

  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(authAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
