import PostForm from "@/components/forms/PostForm";
import React from "react";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-3xl flex-start justify-start items-center w-full gap-3 ">
          <img src="/public/assets/icons/icreatepost.svg" alt="add post" />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>
        <PostForm/>
      </div>
    </div>
  );
};

export default CreatePost;
