import type { CollectionDTO } from "@/services/types/CollectionDTO";
import { FindAllCollections } from "@/services/collectionService";
import type { DefaultDTO } from "@/services/types/DefaultDTO";
import { useInfiniteQuery } from "@tanstack/react-query";
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
