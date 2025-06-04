import type { FlashcardDTO } from "./FlashcardDTO";
import type { ReviewDTO } from "./ReviewDTO";
import type { UserDTO } from "./UserDTO";

export interface DeckDTO {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
  user: UserDTO;
  belongsToAuthUser: boolean;
  belongsToCollectionUser: boolean;
  authUserAssessmentDeck: boolean;
  assessment: number;
  review: ReviewDTO;
  flashcards: FlashcardDTO[];
}
