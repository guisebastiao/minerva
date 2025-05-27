import type { DeckDTO } from "./DeckDTO";

export interface CollectionResponseDTO {
  favorite: boolean;
  deck: DeckDTO;
}
