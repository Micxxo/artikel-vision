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
import { Textarea } from "../ui/textarea";
import type { ArticleStatus, EditArticlePayloadProps } from "@/types/articles";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useFetchOneArticle } from "@/services/articles/fetchOneArticle.service";
import { Fragment, useEffect } from "react";
import LinearSkeleton from "../ui/linear-skeleton";
import { useEditArticle } from "@/services/articles/actionEditArticle.service";
import { Info } from "lucide-react";

const ManageEditArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const queryClient = useQueryClient();
  const editArticle = useEditArticle();

  const getOneArticle = useFetchOneArticle({
    enabled: !!slug,
    id: slug ?? "",
  });

  const inputDisabled =
    editArticle.isPending || getOneArticle.isLoading || getOneArticle.isPending;

  const oldArticleData = getOneArticle.data?.data;

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      category: "",
      content: "",
      title: "",
    },
  });

  const { getValues, trigger, setValue } = form;

  async function handleSubmit(status: ArticleStatus) {
    const isValid = await trigger();
    if (!isValid) return;

    const loadingToast = toast.loading("loading");
    const data = getValues();

    const payload: EditArticlePayloadProps = {
      title: data.title,
      category: data.category,
      content: data.content,
      status,
      id: slug ?? "",
    };

    editArticle.mutateAsync(
      { ...payload },
      {
        onSuccess() {
          queryClient.invalidateQueries({
            predicate: (query) => query.queryKey.includes("GetAllArticle"),
          });

          queryClient.invalidateQueries({ queryKey: ["GetOneArticle", slug] });
          toast.success("Update article success!", {
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

  useEffect(() => {
    if (!oldArticleData) return;
    setValue("category", oldArticleData?.category);
    setValue("content", oldArticleData?.content);
    setValue("title", oldArticleData?.title);
  }, [oldArticleData]);

  if (!oldArticleData && getOneArticle.isError)
    return (
      <div className="w-full h-full flex items-center gap-2 justify-center text-red-600">
        <Info />
        <h1 className="text-2xl"> Cannot retrive article data!</h1>
      </div>
    );

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
                    disabled={inputDisabled}
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
                    disabled={inputDisabled}
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
                    disabled={inputDisabled}
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
            {(getOneArticle.isLoading || getOneArticle.isPending) && (
              <Fragment>
                <LinearSkeleton className="w-20 h-10" />
                <LinearSkeleton className="w-20 h-10" />
              </Fragment>
            )}

            {!getOneArticle.isLoading && !getOneArticle.isPending && (
              <Fragment>
                {oldArticleData?.status !== "publish" && (
                  <Button
                    disabled={inputDisabled}
                    type="button"
                    onClick={() => handleSubmit("publish")}
                  >
                    Publish
                  </Button>
                )}

                {oldArticleData?.status !== "draft" && (
                  <Button
                    disabled={inputDisabled}
                    type="button"
                    onClick={() => handleSubmit("draft")}
                  >
                    Draft
                  </Button>
                )}

                <Button
                  disabled={inputDisabled}
                  type="button"
                  onClick={() =>
                    handleSubmit(oldArticleData?.status as ArticleStatus)
                  }
                >
                  Update data
                </Button>
              </Fragment>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ManageEditArticlePage;
