import { ERROR_MESSAGES } from "@/constants/error";
import { HTTP_STATUS } from "@/constants/status";
import { useManageArticleAPIRequest } from "@/hooks/api/useManageArticleAPIRequest";
import { type ErrorResponse, type SingleResponseData } from "@/types";
import type { Articles } from "@/types/articles";
import { useQuery } from "@tanstack/react-query";

export function useFetchOneArticle({
  enabled,
  id,
}: {
  id: string;
  enabled: boolean;
}) {
  const { getOneArticle } = useManageArticleAPIRequest();

  return useQuery<SingleResponseData<Articles>, ErrorResponse>({
    queryKey: ["GetOneArticle", id],
    async queryFn() {
      try {
        const response = await getOneArticle(id);
        return response.data;
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
