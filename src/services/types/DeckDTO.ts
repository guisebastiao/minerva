import type { ReviewDTO } from "./ReviewDTO";
import type { UserDTO } from "./UserDTO";

export interface DeckDTO {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  publicId: string;
  createdAt: string;
  user: UserDTO;
  belongsToAuthUser: boolean;
  belongsToCollectionUser: boolean;
  authUserAssessmentDeck: boolean;
  assessment: number;
  review: ReviewDTO;
}
