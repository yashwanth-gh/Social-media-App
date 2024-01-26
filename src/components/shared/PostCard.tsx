import { formatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import React from "react";
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

type PostCardProp = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProp) => {
  const user = useAppSelector((state) => state.auth.user);

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
              <DropdownMenuContent className="bg-color-hunt-1 border">
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
                <DropdownMenuItem className="text-red cursor-pointer">
                  <span className="material-symbols-outlined">delete</span>
                  &nbsp;Delete
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
        </div>
      </div>

      <div className="mt-4">
        <img
          src={post.imageUrl || "/public/assets/icons/profile-placeholder.svg"}
          alt="post-image"
          className="post-card_img"
        />
      </div>

      <div>
        <Link to={`/posts/${post.$id}`}>
          <div className="small-medium lg:base-medium py-5">
            <p>{post.caption}</p>
            <ul className="flex gap-1 mt-2">
              {post.tags.map((tag: string) => (
                <li key={tag} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
        </Link>
      </div>

      <div className="post-panel">
        <div>
          <span className="material-symbols-outlined">thumb_up</span>
        </div>
        <div>
          <span className="material-symbols-outlined">chat_bubble</span>
        </div>
        <div>
          <span className="material-symbols-outlined">bookmark</span>
        </div>
        <div>
          <span className="material-symbols-outlined">share</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
