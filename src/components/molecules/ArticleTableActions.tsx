import { Edit, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import type { Articles, EditArticlePayloadProps } from "@/types/articles";
import { useEditArticle } from "@/services/articles/actionEditArticle.service";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type ActionProps = {
  article: Articles;
};

const ArticleTableActions = ({ article }: ActionProps) => {
  const editArticle = useEditArticle();
  const queryClient = useQueryClient();

  const handleMoveToTrashed = () => {
    const loadingToat = toast.loading("Loading...");

    const payload: EditArticlePayloadProps = {
      category: article.category,
      content: article.content,
      id: article.id.toString(),
      status: "thrash",
      title: article.title,
    };

    editArticle.mutateAsync(payload, {
      onSuccess() {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes("GetAllArticle"),
        });
        toast.success("Article moved into trash!", {
          id: loadingToat,
        });
      },
      onError(error) {
        toast.error(`Failed to move article ${error}`, {
          id: loadingToat,
        });
      },
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Link to={`/edit-article/${article.id}`}>
        <Button className="p-2 h-fit">
          <Edit />
        </Button>
      </Link>

      {article.status !== "thrash" && (
        <AlertDialog>
          <AlertDialogTrigger>
            <Button className="p-2 h-fit">
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will be moving your article data into trashed tab
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={handleMoveToTrashed}>Continue</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default ArticleTableActions;
