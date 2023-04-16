import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { HiXMark } from "react-icons/hi2";

type CommentSidebarProps = {
  showCommentSidebar: boolean;
  setShowCommentSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentSidebar = ({
  showCommentSidebar,
  setShowCommentSidebar,
}: CommentSidebarProps) => {
  return (
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
  );
};

export default CommentSidebar;
