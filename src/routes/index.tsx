import MainLayout from "@/components/layouts/MainLayout";
import AddNewArticle from "@/pages/add-new-article/AddNewArticle";
import EditArticlePage from "@/pages/edit-article/EditArticlePage";
import AllPostPage from "@/pages/posts/AllPostPage";
import PreviewPage from "@/pages/preview/PreviewPage";
import { createBrowserRouter, type RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <AllPostPage />,
      },
      {
        path: "/add-new-article",
        element: <AddNewArticle />,
      },
      {
        path: "/preview",
        element: <PreviewPage />,
      },
      {
        path: "/edit-article/:slug", // route untuk edit artikel
        element: <EditArticlePage />,
      },
    ],
  },
];

const browserRouter: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(routes);

export { routes };
export default browserRouter;
