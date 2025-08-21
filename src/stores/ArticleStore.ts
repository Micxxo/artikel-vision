import type { GetAllArticleParams } from "@/types/articles";
import { create } from "zustand";

// widget button only use widgetConfig
interface ArticleStoreState {
  getAllArticleFilter: GetAllArticleParams;
  setGetAllArticleFilter: (getAllArticleFilter: GetAllArticleParams) => void;
}

const useArticleStore = create<ArticleStoreState>()((set) => ({
  getAllArticleFilter: {
    status: "publish",
  },
  setGetAllArticleFilter: (getAllArticleFilter) => set({ getAllArticleFilter }),
}));

export { useArticleStore };
