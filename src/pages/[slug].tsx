import { useRouter } from "next/router";
import MainLayout from "../layouts/MainLayout";
import { trpc } from "../utils/trpc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { BsChat } from "react-icons/bs";
import { useCallback, useState } from "react";
import CommentSidebar from "../components/CommentSidebar";

const PostPage = () => {
  const router = useRouter();

  const postRoute = trpc.useContext().post;

  const getPost = trpc.post.getPost.useQuery(
    {
      slug: router.query.slug as string,
    },
    {
      enabled: Boolean(router.query.slug),
    }
  );

  const invalidateCurrentPostPage = useCallback(() => {
    postRoute.getPost.invalidate({ slug: router.query.slug as string });
  }, [postRoute.getPost, router.query.slug]);

  const likePost = trpc.post.likePost.useMutation({
    onSuccess: () => {
      invalidateCurrentPostPage();
    },
  });

  const dislikePost = trpc.post.disLikePost.useMutation({
    onSuccess: () => {
      invalidateCurrentPostPage();
    },
  });

  const [showCommentSidebar, setShowCommentSidebar] = useState(false);

  return (
    <MainLayout>
      {getPost.data?.id && (
        <CommentSidebar
          showCommentSidebar={showCommentSidebar}
          setShowCommentSidebar={setShowCommentSidebar}
          postId={getPost.data?.id}
        />
      )}

      {getPost.isLoading && (
        <div className="flex h-full w-full items-center justify-center space-x-4">
          <div>
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
          <div>Loading...</div>
        </div>
      )}
      {getPost.isSuccess && (
        <div className="fixed bottom-10 flex w-full items-center justify-center">
          <div className="group flex items-center justify-center space-x-4 rounded-full border border-gray-400 bg-white px-6 py-3 shadow-xl transition duration-300 hover:border-gray-900">
            <div className="border-r pr-4 transition duration-300 group-hover:border-gray-900">
              {getPost.data?.likes && getPost.data?.likes.length > 0 ? (
                <FcLike
                  onClick={() =>
                    getPost.data?.id &&
                    dislikePost.mutate({
                      postId: getPost.data?.id,
                    })
                  }
                  className="cursor-pointer text-xl"
                />
              ) : (
                <FcLikePlaceholder
                  onClick={() =>
                    getPost.data?.id &&
                    likePost.mutate({
                      postId: getPost.data?.id,
                    })
                  }
                  className="cursor-pointer text-xl"
                />
              )}
            </div>
            <div>
              <BsChat
                className="cursor-pointer text-base"
                onClick={() => setShowCommentSidebar(true)}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex h-full w-full flex-col items-center justify-center p-10">
        <div className="flex w-full max-w-screen-lg flex-col space-y-6">
          <div className="relative h-[60vh] w-full rounded-xl bg-gray-300 shadow-lg">
            {/* here we will render the image */}
            <div className="absolute flex h-full w-full items-center justify-center ">
              <div className="rounded-xl bg-black bg-opacity-50 p-4 text-3xl text-white">
                {getPost.data?.title}
              </div>
            </div>
          </div>
          <div className="border-l-4 border-gray-800 pl-6">
            {getPost.data?.description}
          </div>
          <div>{getPost.data?.text}</div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostPage;
