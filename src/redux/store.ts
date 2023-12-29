import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import { useDispatch } from "react-redux";
export const store = configureStore({
    reducer:{
        auth:authReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export this type so it can be used in components or other files
export const useAppDispatch = () => useDispatch<AppDispatch>();