import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploder from "../shared/FileUploder";
import { PostFormValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations";
import { useAppSelector } from "@/redux/hooks";
import { useToast } from "../ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";

type PostFormProps = {
  post?: Models.Document| null | undefined;
  action : "create" | "update";
};

const PostForm = ({ post,action }: PostFormProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const user = useAppSelector((state) => state.auth.user);
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();

  const { toast } = useToast();
  const navigate = useNavigate();

  //^-------------------- autofocus related -------------------------
  //^-- autofocus on desktop only not mobile

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    //* Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //^-------------------- Form related -------------------------
  // 1. Define your form.
  const form = useForm<z.infer<typeof PostFormValidation>>({
    resolver: zodResolver(PostFormValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostFormValidation>) {

    if(post && action==="update"){
      const updatedPost = await updatePost({
        ...values,
        postId:post?.$id,
        imageId:post?.imageId,
        imageUrl:post?.imageUrl
      })
      if(!updatedPost){
        toast({
          title: "Sorry!, Please try again",
        });
      }

      return navigate(`/posts/${post.$id}`);
    }

    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        title: "Sorry!, Please try again",
      });
    } else {
      navigate("/");
      return toast({
        title: "Your Post is Uploaded!",
      });

    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-3xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What's going on?"
                  {...field}
                  className="shad-textarea custom-scrollbar active:outline-none"
                  {...(isMobile ? {} : { autoFocus: true })}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add file</FormLabel>
              <FormControl>
                <FileUploder
                  fileChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                  isMobile={isMobile}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add location</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="ex: Bengaluru"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="ex: vacation, travel.."
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center gap-3">
          <Link to={'/'} onClick={()=>toast({title:'Changes discarded'})}>
          <Button variant="outline" type="button">
            Cancel
          </Button>
          </Link>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate||isLoadingUpdate}
          >
            {(isLoadingCreate||isLoadingUpdate)?(
              <Loader/>
            ):(`${action} post`)}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
