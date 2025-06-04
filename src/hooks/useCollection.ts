import type { AddNewCollectionSchema } from "@/schemas/AddNewCollectionSchema";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import type { CollectionDTO } from "@/services/types/CollectionDTO";
import type { FavoriteSchema } from "@/schemas/FavoriteSchema";
import type { DefaultDTO } from "@/services/types/DefaultDTO";
import { useParams, useSearchParams } from "react-router-dom";
import { queryClient } from "@/context/QueryContext";
import { toast } from "sonner";
import {
  AddFavorite,
  FindAllCollections,
  AddNewCollection,
  RemoveCollection,
  FindAllCollectionsToStudy,
} from "@/services/collectionService";

export const addNewCollection = () => {
  return useMutation({
    mutationFn: (data: AddNewCollectionSchema) => AddNewCollection(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["community"] });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      queryClient.invalidateQueries({ queryKey: ["FindDeck"] });
      toast.success(data.message);
    },
  });
};

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

export const findAllCollectionsToStudy = () => {
  const [searchParams] = useSearchParams();
  const { deckId } = useParams();

  const offset = searchParams.get("offset") || 0;

  return useQuery({
    queryFn: () => {
      return FindAllCollectionsToStudy({
        deckId: deckId!,
        offset: Number(offset),
        limit: 20,
      });
    },
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return false;
    },
    queryKey: ["findToStudy", deckId],
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

export const removeCollection = () => {
  return useMutation({
    mutationFn: (deckId: string) => RemoveCollection(deckId),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["community"] });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast.success(data.message);
    },
  });
};
