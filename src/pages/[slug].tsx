import { useRouter } from "next/router";
import MainLayout from "../layouts/MainLayout";
import { trpc } from "../utils/trpc";

const PostPage = () => {
  const router = useRouter();

  const getPost = trpc.post.getPost.useQuery(
    {
      slug: router.query.slug as string,
    },
    {
      enabled: Boolean(router.query.slug),
    }
  );

  console.log(getPost);

  return (
    <MainLayout>
      <div className="flex h-full w-full flex-col items-center justify-center p-10">
        <div className="flex w-full max-w-screen-lg flex-col space-y-6">
          <div className="h-[60vh] w-full rounded-xl bg-gray-300 shadow-lg">
            {/* here we will render the image */}
          </div>
          <div className="border-l-4 border-gray-800 pl-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            reprehenderit, quibusdam recusandae dolore sapiente alias maxime
            illo rem repudiandae eum numquam dicta nulla nam. Sunt!
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus quod
            totam vero? Fugiat error unde cum recusandae, totam possimus nostrum
            ratione asperiores maiores incidunt non pariatur nesciunt
            consectetur, magnam fuga. Nisi, ipsum odio laudantium a molestias
            aliquam dolor iusto distinctio mollitia at temporibus, eum beatae
            dicta voluptatem nihil sunt impedit rem eaque fuga asperiores sed!
            Consequatur eaque laborum dolorem quaerat excepturi eius
            necessitatibus culpa nulla voluptas expedita numquam ad itaque, hic,
            omnis laudantium, magnam quidem sapiente sequi autem doloremque
            rerum veritatis molestias corporis! Maiores quisquam est nam.
            Nostrum repudiandae vero eligendi maiores veniam, porro adipisci
            doloribus quod cupiditate consequatur dolorem!
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PostPage;
