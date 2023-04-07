import slugify from "slugify";
import { writeFormSchema } from "../../../components/WriteFormModal";
import { router, protectedProcedure } from "../trpc";

export const postRouter = router({
  createPost: protectedProcedure
    .input(writeFormSchema)
    .mutation(
      async ({
        ctx: { prisma, session },
        input: { title, description, text },
      }) => {
        await prisma.post.create({
          data: {
            title,
            description,
            text,
            slug: slugify(title),
            authorId: session.user.id,
          },
        });
      }
    ),
});
