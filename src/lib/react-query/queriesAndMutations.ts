import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from "@tanstack/react-query";
import authService from "../appwrite/auth";
import { INewUser } from "@/types";

export const useCreateNewUserAccount = ()=>{
    return useMutation({
        mutationFn : (user:INewUser)=>authService.createAccount(user)
    });
}
export const useSignInAccount = ()=>{
    return useMutation({
        mutationFn : (user:{
            email:string,
            password:string,
        })=>authService.login(user)
    });
}
export const useSignOutAccount = ()=>{
    return useMutation({
        mutationFn : ()=>authService.logout()
    });
}