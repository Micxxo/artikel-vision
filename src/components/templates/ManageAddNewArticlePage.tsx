import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import type z from "zod";
import { CreatePostSchema } from "@/schemas/CreatePostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateArticle } from "@/services/articles/actionCreateArticle.service";
import { Textarea } from "../ui/textarea";
import type {
  ArticleStatus,
  CreateArticlePayloadProps,
} from "@/types/articles";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ManageAddNewArticlePage = () => {
  const queryClient = useQueryClient();
  const createArticle = useCreateArticle();

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      category: "",
      content: "",
      title: "",
    },
  });

  const { getValues, trigger, reset } = form;

  async function handleSubmit(status: ArticleStatus) {
    const isValid = await trigger();
    if (!isValid) return;

    const loadingToast = toast.loading("loading");
    const data = getValues();

    const payload: CreateArticlePayloadProps = {
      title: data.title,
      category: data.category,
      content: data.content,
      status,
    };

    createArticle.mutateAsync(
      { ...payload },
      {
        onSuccess() {
          reset();
          queryClient.invalidateQueries({
            predicate: (query) => query.queryKey.includes("GetAllArticle"),
          });
          toast.success("Add new article success!", {
            id: loadingToast,
          });
        },
        onError(error) {
          toast.error(`Add new article failed: ${error}`, {
            id: loadingToast,
          });
        },
      }
    );
  }

  return (
    <div className="p-5">
      <Form {...form}>
        <form className="w-full space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={createArticle.isPending}
                    placeholder="Input title"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your article title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={createArticle.isPending}
                    placeholder="Input content"
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your article content.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    disabled={createArticle.isPending}
                    placeholder="Input category"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your article category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <Button
              disabled={createArticle.isPending}
              type="button"
              onClick={() => handleSubmit("publish")}
              className="bg-blue-600 hover:bg-blue-500"
            >
              Publish
            </Button>
            <Button
              disabled={createArticle.isPending}
              type="button"
              onClick={() => handleSubmit("draft")}
            >
              Draft
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ManageAddNewArticlePage;
