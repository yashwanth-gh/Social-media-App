import { formatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// *--------------------shad-cn/ui---------------------
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/redux/hooks";
import PostStats from "./PostStats";
import { useDeletePost } from "@/lib/react-query/queriesAndMutations";
import CustomDialog from "./CustomDialog";
import BirdLoader from "./BirdLoader";

type PostCardProp = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProp) => {
  const [open, setOpen] = useState(false);  //this is for delete confirmation dialog

  const user = useAppSelector((state) =>state.auth.user);
  const {
    mutateAsync: permanentlyDeletePost,
    isPending: isPermanentlyDeletePost,
  } = useDeletePost();

  const handleDeletePost = async()=>{
   const res = await permanentlyDeletePost({postId:post.$id,imageId:post.imageId})
    if(res?.status === 'ok'){
      console.log("deleted")
    }else{
      console.log("not deleted",res?.status)
    }
  }
  if(isPermanentlyDeletePost){
    return <BirdLoader/>
  }
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "/public/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 rounded-full lg:h-12"
            />
          </Link>
          <div className="flex flex-col ">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-col gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {formatDateString(post.$createdAt)}
              </p>
              <p className="subtle-semibold lg:small-regular">
                &#183; {post.location}
              </p>
            </div>
          </div>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="material-symbols-outlined">more_vert</span>
            </DropdownMenuTrigger>
            {user.id == post.creator.$id ? (
              <DropdownMenuContent
                className="bg-color-hunt-1 border"
                forceMount
              >
                <DropdownMenuLabel className="text-center">
                  Your Post
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={`/update-post/${post.$id}`}>
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="material-symbols-outlined">edit</span>
                    &nbsp; Edit Post
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="text-red cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <span className="material-symbols-outlined">delete</span>
                  &nbsp; Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent className="bg-color-hunt-2">
                <DropdownMenuLabel className="text-center">
                  More options
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span className="material-symbols-outlined">flag</span>&nbsp;
                  Report post
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
          <CustomDialog open={open} setOpen={setOpen} OkFunction={handleDeletePost}/>
        </div>
      </div>
      <Link to={`/posts/${post.$id}`}>
      <div className="mt-4">
        <img
          src={post.imageUrl || "/public/assets/icons/profile-placeholder.svg"}
          alt="post-image"
          className='post-card_img'
        />
      </div>

      <div>
        
          <div className="small-medium lg:base-medium py-5">
            <p>{post.caption}</p>
            <ul className="flex gap-1 mt-2 flex-wrap">
              {post.tags.map((tag: string) => (
                <li key={tag} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
      </div>
        </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
