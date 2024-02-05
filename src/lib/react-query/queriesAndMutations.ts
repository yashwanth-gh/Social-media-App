import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from "@tanstack/react-query";
import authService from "../appwrite/auth";
import { INewPost, INewUser, IUpdatePost } from "@/types";
import { QUERY_KEYS } from "./queryKeys";
import { string } from "zod";

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

export const useLikePost = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : ({postId,likesArray}:{postId:string,likesArray : string[]})=>authService.likePost(postId,likesArray),
        onSuccess : (data)=>{
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_POST_BY_ID,data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useSavePost = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : ({postId,userId}:{postId:string,userId : string})=>authService.savePost(postId,userId),
        onSuccess : ()=>{
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useDeleteSavedPost = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : (savedRecordId:string)=>authService.deleteSavedPost(savedRecordId),
        onSuccess : ()=>{
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_CURRENT_USER]
            })
        }
    })
}

export const useGetCurrentUser = ()=>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_CURRENT_USER],
        queryFn : ()=>authService.getCurrentUser()
    })
} 

export const useGetPostById = (postId:string)=>{
    return useQuery({
        queryKey : [QUERY_KEYS.GET_POST_BY_ID,postId],
        queryFn : ()=>authService.getPostById(postId),
        enabled:true,
    })
}

export const useUpdatePost = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : (post:IUpdatePost)=>authService.updatePost(post),
        onSuccess : (data)=>{
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_POST_BY_ID,data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}

export const useDeletePost = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn : ({postId,imageId}:{postId:string,imageId:string})=>authService.deletePost(postId,imageId),
        onSuccess : ()=>{
            queryClient.invalidateQueries({
                queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
            })
        }
    })
}