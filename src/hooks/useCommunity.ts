import { FindAllPublicCollections } from "@/services/communityService";
import type { DefaultDTO } from "@/services/types/DefaultDTO";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { DeckDTO } from "@/services/types/DeckDTO";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const findAllPublicCollections = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");
  const order = searchParams.get("order");

  return useInfiniteQuery({
    queryFn: ({ pageParam }) => {
      return FindAllPublicCollections({
        search,
        order,
        offset: pageParam,
        limit: 12,
      });
    },
    getNextPageParam: (lastPage: DefaultDTO<DeckDTO[]>) => {
      const nextPage = lastPage.paging?.currentPage! + 1;

      const hasMore = nextPage < lastPage.paging?.totalPages!;
      return hasMore ? nextPage : undefined;
    },
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return false;
    },
    queryKey: ["community", search, order],
    initialPageParam: 0,
  });
};
