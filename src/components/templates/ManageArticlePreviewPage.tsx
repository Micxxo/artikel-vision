import { useFetchAllArticles } from "@/services/articles/fetchAllArticles.service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { format } from "date-fns";
import { Separator } from "../ui/separator";
import Pagination from "../molecules/Pagination";
import { useState } from "react";
import { LIMIT } from "@/constants/limit";

const ManageArticlePreviewPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(LIMIT[25]);

  const getAllPublishedArticle = useFetchAllArticles({
    enabled: true,
    limit: itemsPerPage,
    page: currentPage,
    status: "publish",
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    const newItemsPerPage = parseInt(value, 10);
    setItemsPerPage(newItemsPerPage);
  };

  const articles = getAllPublishedArticle.data?.data ?? [];

  return (
    <div className="p-5">
      <div className="w-full grid grid-cols-3 gap-5">
        {articles.map((article) => {
          return (
            <Dialog key={article.id}>
              <DialogTrigger className="text-start">
                <div
                  className="p-4 h-80 overflow-hidden rounded-xl shadow-md bg-gray-50 cursor-pointer hover:bg-gray-100"
                  style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1);" }}
                >
                  <h1 className="font-semibold text-lg">{article.title}</h1>
                  <p className="text-sm text-muted-foreground">
                    Category: {article.category}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Date: {format(new Date(article.createdAt), "d MMMM yyyy")}{" "}
                  </p>
                  <p className="mt-1">
                    {article.content.length > 150
                      ? article.content.slice(0, 200)
                      : article.content}
                    <span className="text-blue-600">. Click to show more</span>
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{article.title}</DialogTitle>
                  <Separator />
                  <p className="text-sm text-slate-800">
                    Category: {article.category}
                  </p>
                  <p className="text-sm text-slate-800">
                    Date: {format(new Date(article.createdAt), "d MMMM yyyy")}{" "}
                  </p>
                  <DialogDescription>{article.content}</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={getAllPublishedArticle.data?.totalData ?? 0}
        onItemsPerPageChange={handleItemsPerPageChange}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ManageArticlePreviewPage;
