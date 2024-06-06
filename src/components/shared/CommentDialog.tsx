import React from "react";
import { Models } from "appwrite";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import AddComment from "./AddComment";

const CommentDialog = ({ post }: { post: Models.Document }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="flex justify-center items-center gap-2">
            <img src="/public/assets/icons/comment.svg" alt="like" />
            <p className="small-medium lg:base-medium">{post.comments}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="small-regular">
              Replying to &nbsp;
              <span className="text-blue-400">@{post.creator.name}</span>
            </DialogTitle>
            <AddComment post={post} />
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className=" border border-slate-100"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentDialog;
