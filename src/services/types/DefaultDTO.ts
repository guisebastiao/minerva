import type { FieldErrorDTO } from "@/services/types/FieldErrorDTO";
import type { PagingDTO } from "@/services/types/PagingDTO";

export interface DefaultDTO<T = unknown> {
  message: string;
  success: boolean;
  data?: T;
  paging?: PagingDTO;
  fieldErrors?: FieldErrorDTO[];
}
