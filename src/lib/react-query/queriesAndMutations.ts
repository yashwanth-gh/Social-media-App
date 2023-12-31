import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from "@tanstack/react-query";
import authService from "../appwrite/auth";
import { INewPost, INewUser } from "@/types";
import { QUERY_KEYS } from "./queryKeys";

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
export const useCreatePost = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (post:INewPost)=>authService.createPost(post),
        onSuccess : ()=>{
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    });
}

export const useGetRecentPosts = ()=>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
        queryFn:()=>authService.getRecentPosts()
    })
}