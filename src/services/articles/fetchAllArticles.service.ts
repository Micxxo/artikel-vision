import { ERROR_MESSAGES } from "@/constants/error";
import { HTTP_STATUS } from "@/constants/status";
import { useManageArticleAPIRequest } from "@/hooks/api/useManageArticleAPIRequest";
import type { ErrorResponse, GeneralFilter, ResponseData } from "@/types";
import type { Articles, GetAllArticleParams } from "@/types/articles";
import { useQuery } from "@tanstack/react-query";

export function useFetchAllArticles({
  enabled,
  ...params
}: GetAllArticleParams & GeneralFilter) {
  const { getAllArticle } = useManageArticleAPIRequest();

  return useQuery<ResponseData<Articles>, ErrorResponse>({
    queryKey: ["GetAllArticle", params],
    async queryFn() {
      try {
        return await getAllArticle({ ...params });
      } catch (err: any) {
        console.error(err);
        throw {
          message:
            err.response?.data?.message ?? ERROR_MESSAGES.UNEXPECTED_ERROR,
          code: err.response?.data?.code ?? HTTP_STATUS.INTERNAL_SERVER_ERROR,
        };
      }
    },
    enabled: enabled,
    retry: 1,
    staleTime: 2 * 60 * 1000,
  });
}
