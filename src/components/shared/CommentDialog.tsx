import React from "react";
import { Models } from "appwrite";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const AddComment = ({ post }: { post: Models.Document }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="flex justify-center items-center gap-2">
            <img src="/public/assets/icons/comment.svg" alt="like" />
            <p className="small-medium lg:base-medium">
              {post.comments.length}
            </p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="small-regular">
              Replying to &nbsp;
              <span className="text-blue-400">@{post.creator.name}</span>
            </DialogTitle>

          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className=' border border-slate-100'>
                Close
              </Button>
            </DialogClose>
            <Button type="button" className="bg-color-hunt-5 text-color-hunt-1">
                Post
              </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddComment;
