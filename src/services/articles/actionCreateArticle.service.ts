import { useMutation } from "@tanstack/react-query";
import { useManageArticleAPIRequest } from "@/hooks/api/useManageArticleAPIRequest";
import type { ErrorResponse } from "@/types";
import type { CreateArticlePayloadProps } from "@/types/articles";
import { HTTP_STATUS } from "@/constants/status";

export function useCreateArticle() {
  const { createArticle } = useManageArticleAPIRequest();

  return useMutation<void, ErrorResponse, CreateArticlePayloadProps>({
    mutationFn: async (payload) => {
      try {
        if (!payload) {
          const error = new Error("Missing payload!");
          (error as any).code = 400;
          throw error;
        }

        await createArticle({
          ...payload,
        });
      } catch (err: any) {
        console.error(err);

        const message =
          err?.response?.data?.message ?? err?.message ?? "Unexpected Error";
        const code =
          err?.response?.data?.code ??
          err?.code ??
          HTTP_STATUS.INTERNAL_SERVER_ERROR;

        const finalError = new Error(message);
        (finalError as any).code = code;

        throw finalError;
      }
    },
  });
}
