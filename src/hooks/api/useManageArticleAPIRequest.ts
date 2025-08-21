import { LIMIT } from "@/constants/limit";
import { api } from "@/helpers/apiHelper";
import { removeEmptyValues } from "@/helpers/removeEmptyValueHelper";
import type {
  CreateArticlePayloadProps,
  EditArticlePayloadProps,
  GetAllArticleParams,
} from "@/types/articles";

const useManageArticleAPIRequest = () => {
  const getAllArticle = async ({
    limit,
    page,
    ...filters
  }: GetAllArticleParams) => {
    const cleanFilters = removeEmptyValues({ obj: filters });
    const response = await api.get(
      `/article/${limit ?? LIMIT[25]}/${page ?? 1}`,
      {
        params: cleanFilters,
      }
    );

    return response.data;
  };

  const createArticle = async ({ ...payload }: CreateArticlePayloadProps) => {
    const response = await api.post("/article", payload);

    if (!response.status) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response;
  };

  const editArticle = async ({ id, ...payload }: EditArticlePayloadProps) => {
    const response = await api.patch(`/article/${id}`, payload);

    if (!response.status) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response;
  };

  const getOneArticle = async (id: string) => {
    const response = await api.get(`/article/${id}`);

    if (!response.status) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return response;
  };

  return { getAllArticle, createArticle, editArticle, getOneArticle };
};

export { useManageArticleAPIRequest };
