import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
  
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { toast } from "../ui/use-toast";
import AddComment from "./AddComment";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);


  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } =
    useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save?.find(
    (record: Models.Document) => record.post.$id === post.$id
  );
  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);

    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    // console.log(savedPostRecord);

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ postId: post.$id, userId });
      setIsSaved(true);
    }
  };

  const sharePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    const postUrl = window.location.href + `posts/${post.$id}`;
    navigator.clipboard.writeText(postUrl);
    return toast({
      title: "Post url copied to clipboard",
    });
  };

  return (
    <div className="post-panel">
      <div className="flex-center gap-2">
        <img
          src={`${
            !checkIsLiked(likes, userId)
              ? "/public/assets/icons/likes.svg"
              : "/public/assets/icons/likesFilled.svg"
          }
        `}
          alt="like"
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex-center gap-2">
          <AddComment post={post}/>
      </div>

      <div className="flex-center gap-2">
        {isSavingPost || isDeletingSavedPost ? (
          <Loader />
        ) : (
          <img
            src={`${
              !isSaved
                ? "/public/assets/icons/savePost.svg"
                : "/public/assets/icons/savePostFilled.svg"
            }
                `}
            alt="save"
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
      <div onClick={sharePost} className="cursor-pointer">
        <span className="material-symbols-outlined">share</span>
      </div>
    </div>
  );
};

export default PostStats;
