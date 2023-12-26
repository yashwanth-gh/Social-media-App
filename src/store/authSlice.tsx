import { IUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type IInitialStateType = {
    user:IUser,
    isLoading:boolean,
    isAuthenticated:boolean,
}

export const INITIAL_USER = {
    id:"",
    name:"",
    username:"",
    email:"",
    imageUrl:"",
    bio:"",
};

const INITIAL_STATE:IInitialStateType = {
    user:INITIAL_USER,
    isLoading:false,
    isAuthenticated:false,
};


export const authSlice = createSlice({
    name:"auth",
    initialState:INITIAL_STATE,
    reducers : {
        setUser : (state,action)=>{
            state.user = action.payload;
        },
        setIsAuthenticated:(state,action)=>{
            state.isAuthenticated = action.payload;
        },
        setIsLoading:(state,action)=>{
            state.isLoading =  action.payload;
        }
    }
})