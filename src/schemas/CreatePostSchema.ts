import z from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(20, {
    message: "Title must be at least 20 characters.",
  }),
  content: z.string().min(200, {
    message: "Content must be at least 200 characters.",
  }),
  category: z.string().min(3, {
    message: "Category must be at least 3 characters.",
  }),
});

export type CreatePostSchemaType = z.infer<typeof CreatePostSchema>;
