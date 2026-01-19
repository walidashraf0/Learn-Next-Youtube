import z from "zod";

export const createPostSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters").max(100),
    content: z.string().min(10),
  });