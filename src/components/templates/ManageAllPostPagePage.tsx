import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TableComponent from "../molecules/TableComponent";
import type { ColumnDef } from "@tanstack/react-table";
import { useFetchAllArticles } from "@/services/articles/fetchAllArticles.service";
import { useArticleStore } from "@/stores/ArticleStore";
import type { Articles, ArticleStatus } from "@/types/articles";
import ArticleTableActions from "../molecules/ArticleTableActions";

const columns: ColumnDef<Articles>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("category")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <ArticleTableActions article={row.original} />
        </div>
      );
    },
  },
];

const ManageAllPostPagePage = () => {
  const { getAllArticleFilter, setGetAllArticleFilter } = useArticleStore();

  const articleFilter = {
    status: getAllArticleFilter.status,
  };

  const handleOnTabChange = (value: ArticleStatus) => {
    setGetAllArticleFilter({
      ...getAllArticleFilter,
      status: value,
    });
  };

  return (
    <div className="p-5">
      <Tabs
        onValueChange={(value) => handleOnTabChange(value as ArticleStatus)}
        defaultValue={getAllArticleFilter.status ?? "publish"}
      >
        <TabsList>
          <TabsTrigger value="publish">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="thrash">Trashed</TabsTrigger>
        </TabsList>
        <TabsContent value="publish" className="py-2">
          <TableComponent
            dataFetchService={useFetchAllArticles}
            columns={columns}
            filters={articleFilter}
          />
        </TabsContent>
        <TabsContent value="draft" className="py-2">
          <TableComponent
            dataFetchService={useFetchAllArticles}
            columns={columns}
            filters={articleFilter}
          />
        </TabsContent>
        <TabsContent value="thrash" className="py-2">
          <TableComponent
            dataFetchService={useFetchAllArticles}
            columns={columns}
            filters={articleFilter}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageAllPostPagePage;
