import { AddFavorite, FindAllCollections } from "@/services/collectionService";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import type { CollectionDTO } from "@/services/types/CollectionDTO";
import type { FavoriteSchema } from "@/schemas/FavoriteSchema";
import type { DefaultDTO } from "@/services/types/DefaultDTO";
import { queryClient } from "@/context/QueryContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const findAllCollections = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  return useInfiniteQuery({
    queryFn: ({ pageParam }) => {
      return FindAllCollections({
        search,
        offset: pageParam,
        limit: 12,
      });
    },
    getNextPageParam: (lastPage: DefaultDTO<CollectionDTO[]>) => {
      const nextPage = lastPage.paging?.currentPage! + 1;

      const hasMore = nextPage < lastPage.paging?.totalPages!;
      return hasMore ? nextPage : undefined;
    },
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return false;
    },
    queryKey: ["collections", search],
    initialPageParam: 0,
  });
};

export const addFavorite = () => {
  return useMutation({
    mutationFn: (data: FavoriteSchema) => AddFavorite(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success(data.message);
    },
  });
};
