import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Models } from "appwrite";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const AddComment = ({ post }: { post: Models.Document }) => {
  const commentsList = post.comments.map((user: Models.Document) => {
    return {
      userId: user.$id,
      userAvatar: user.imageUrl,
    };
  });
  // console.log(commentsList);
  const [currentComment, setCurrentComment] = useState("");
  const [allComments, setAllComments] = useState(commentsList);
  const { data: currentUser } = useGetCurrentUser();

  const handleCommentSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    let newAllComments = [...allComments]
    console.log(currentUser)
    setCurrentComment("");
  };

  return (
    <div>
      {" "}
      <Input
        type="text"
        placeholder="Your comment"
        value={currentComment}
        onChange={(e) => setCurrentComment(e.target.value)}
      />
      <Button type="button" onClick={handleCommentSubmit}>
        Subscribe
      </Button>
    </div>
  );
};

export default AddComment;
