import { useRouter } from "next/router";
import MainLayout from "../layouts/MainLayout";
import { trpc } from "../utils/trpc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { BsChat } from "react-icons/bs";
import { Fragment, useCallback, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiXMark } from "react-icons/hi2";

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
      <Transition.Root show={showCommentSidebar} as={Fragment}>
        <Dialog as="div" onClose={() => setShowCommentSidebar(false)}>
          <div className="fixed right-0 top-0">
            <Transition.Child
              enter="transition duration-1000"
              leave="transition duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative h-screen w-[200px] bg-white shadow-md sm:w-[400px]">
                <div className="flex h-full w-full flex-col overflow-scroll px-6">
                  <div className="mt-10 mb-5 flex items-center justify-between text-xl">
                    <h2 className="font-medium">Responses (4)</h2>
                    <div>
                      <HiXMark
                        className="cursor-pointer"
                        onClick={() => setShowCommentSidebar(false)}
                      />
                    </div>
                  </div>
                  <form className="flex flex-col items-end space-y-5">
                    <textarea
                      id="comment"
                      rows={3}
                      className="w-full rounded-xl border border-gray-300 p-4 shadow-lg outline-none focus:border-gray-600"
                      placeholder="What are your thoughts?"
                    />
                    <button
                      type="submit"
                      className="flex items-center space-x-3 rounded border border-gray-300 px-4 py-2 transition hover:border-gray-900 hover:text-gray-900"
                    >
                      Comment
                    </button>
                  </form>
                  <div className="flex flex-col items-center justify-center space-y-6">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        className="flex w-full flex-col space-y-2 border-b border-b-gray-300 pb-4 last:border-none"
                        key={i}
                      >
                        <div className="flex w-full items-center space-x-2 text-xs">
                          <div className="relative h-8 w-8 rounded-full bg-gray-400"></div>
                          <div>
                            <p className="font-semibold">Michael Frieze</p>
                            <p className="">2 hours ago</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Ad alias, temporibus provident totam libero id
                          ipsum autem dolore natus ex.
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

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
