import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
    }
});


// Export this type so it can be used in components or other files

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;