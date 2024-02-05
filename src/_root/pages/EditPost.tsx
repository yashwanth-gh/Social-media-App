import PostForm from "@/components/forms/PostForm";
import BirdLoader from "@/components/shared/BirdLoader";

import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import React from "react";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const {id} = useParams();
  const {data:post,isPending} = useGetPostById(id || '');
  
  if(isPending)return <BirdLoader/>
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-3xl flex-start justify-start items-center w-full gap-3 ">
          <img src="/public/assets/icons/icreatepost.svg" alt="add post" />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
        <PostForm post={post} action="update"/>
      </div>
    </div>
  );
};

export default EditPost;
