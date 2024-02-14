import { formatDateString } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

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
import {
  useDeletePost,
  useFullFileUrl,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutations";
import CustomDialog from "@/components/shared/CustomDialog";
import BirdLoader from "@/components/shared/BirdLoader";
import PostStats from "@/components/shared/PostStats";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PostDetails = () => {
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const { data: post, isPending: isPostLoading } = useGetPostById(id || "");
  const { data: fullImageView, isLoading: isLoadingPostImage } = useFullFileUrl(
    post?.imageId,
    !!post
  );
  const [open, setOpen] = useState(false); //this is for delete confirmation dialog
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const {
    mutateAsync: permanentlyDeletePost,
    isPending: isPermanentlyDeletePost,
  } = useDeletePost();

  const handleDeletePost = async () => {
    const res = await permanentlyDeletePost({
      postId: post.$id,
      imageId: post?.imageId,
    });
    if (res?.status === "ok") {
      console.log("deleted");
    } else {
      console.log("not deleted", res?.status);
    }
  };
  const handleCommentSubmit = async (e:MouseEvent) => {
    e.preventDefault();
    console.log(comment);
    setComment("");
  };

  if (isPostLoading || isPermanentlyDeletePost || isLoadingPostImage) {
    if (isPermanentlyDeletePost) {
      navigate("/");
    }
    return <BirdLoader />;
  }
  return (
    <div className="flex flex-col md:flex-row justify-start items-stretch overflow-scroll custom-scrollbar">
      <div className="flex flex-col bg-color-hunt-2 w-full">
        <div className="flex-between w-full pb-4 pl-2 pt-6">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${post?.creator.$id}`}>
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
                {post?.creator.name}
              </p>
              <div className="flex-col gap-2 text-light-3">
                <p className="subtle-semibold lg:small-regular">
                  {post && formatDateString(post.$createdAt)}
                </p>
              </div>
            </div>
          </div>
          <div className="mr-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="material-symbols-outlined">more_vert</span>
              </DropdownMenuTrigger>
              {user.id == post?.creator.$id ? (
                <DropdownMenuContent
                  className="bg-color-hunt-1 border"
                  forceMount
                >
                  <DropdownMenuLabel className="text-center">
                    Your Post
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to={`/update-post/${post?.$id}`}>
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
                    <span className="material-symbols-outlined">flag</span>
                    &nbsp; Report post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
            <CustomDialog
              open={open}
              setOpen={setOpen}
              OkFunction={handleDeletePost}
            />
          </div>
        </div>
        <div className="bg-color-hunt-1 w-full h-full flex items-center">
          {/* image goes here */}
          <img
            src={`${fullImageView}`}
            alt="postImage"
            className="w-full post_details-img "
          />
        </div>
      </div>
      <div className="px-3 bg-color-hunt-2 py-4 md:w-5/6">
        <div>
          {/* post desc goes here only for large devices */}
          <div className="small-medium lg:base-medium py-5">
            <p>{post?.caption}</p>
            <ul className="flex gap-1 mt-2 flex-wrap">
              {post?.tags.map((tag: string) => (
                <li key={tag} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          {/* post stats container here */}
          <PostStats
            post={post}
            userId={user.id}
            customClassName="bg-color-hunt-2"
          />
        </div>

        <div className="flex flex-col items-start h-full">
          {/* post comments goes here */}
          <div className="flex">
            {/* comment input box */}
              <Input type="text"placeholder="Your comment" value={comment} onChange={(e)=>setComment(e.target.value)}/>
              <Button type="button" onClick={handleCommentSubmit}>Subscribe</Button>
          </div>
          <div className="h-full overflow-scroll custom-scrollbar">
            {/* all comments are rendered here */}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
            animi ullam a ratione, aperiam illum hic nemo nam suscipit
            laudantium?Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Distinctio ad iste recusandae dolore consequuntur dolorem vitae
            rerum quasi quibusdam aperiam exercitationem nesciunt reiciendis
            sequi, enim eum. Hic enim, neque dignissimos recusandae possimus
            placeat quas officia temporibus iure delectus deserunt odio tempore
            necessitatibus laborum commodi nemo doloribus nisi impedit facilis.
            Ut molestias enim esse magni nihil voluptates corrupti culpa, velit
            praesentium odit veritatis minus aliquam a unde facere. Ipsa quos at
            illo inventore fugiat doloribus quaerat minima consequuntur quisquam
            expedita esse repudiandae dolores error odio culpa ex, iste enim
            obcaecati eveniet adipisci consequatur. Quia ea numquam blanditiis
            deleniti, odio delectus reprehenderit?Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Eveniet odit repudiandae voluptates
            est fuga perspiciatis, aut similique explicabo quia dolorem
            quibusdam necessitatibus, quos sequi atque possimus beatae facere
            rerum debitis delectus reiciendis. Minima tempore harum ipsam, ullam
            cum, totam necessitatibus iure tempora fugit, magnam id ut! Quis
            reiciendis doloremque, eum delectus fugiat dolor facilis tenetur
            nulla hic magnam laboriosam repellendus nostrum eligendi modi
            voluptatem expedita cumque. Hic ducimus ut dolor quae alias. Unde
            accusamus odio, iure corrupti dicta optio asperiores sint quo minima
            quas nesciunt, blanditiis ipsam, totam hic fuga earum ab. Rem
            aliquid, est ab, maiores reprehenderit laudantium modi omnis
            quibusdam assumenda, sunt officiis magni laborum expedita veritatis
            cum sint odit reiciendis voluptatum asperiores quasi molestiae dolor
            numquam. Nostrum ipsum quam nisi, blanditiis voluptate fugit vitae
            obcaecati necessitatibus explicabo hic animi itaque dolores et
            accusamus! Mollitia vel nemo esse corporis in ipsa, architecto unde
            molestiae et adipisci hic cumque explicabo culpa dicta vero iure
            numquam accusantium, facere, illo blanditiis quibusdam quasi! Velit
            dolore officiis ratione repellendus itaque facilis, nihil expedita
            deserunt iure eligendi dignissimos fuga iste alias eveniet
            voluptatem neque doloremque unde numquam veniam! Expedita, unde eos!
            Ducimus nemo neque assumenda, possimus quidem perspiciatis sequi
            quis nisi. Neque, at.
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostDetails;
