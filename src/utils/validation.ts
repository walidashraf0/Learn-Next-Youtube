import z from "zod";

export const createPostSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters").max(100),
    content: z.string().min(10),
  });

  export const createCommentSchema = z.object({
    text: z.string().min(8, "Comment must be at least 8 characters").max(50),
    postId: z.number(),
  });