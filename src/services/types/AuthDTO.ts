import type { UserDTO } from "@/services/types/UserDTO";

export interface AuthDTO {
  token: string;
  expires: string;
  user: UserDTO;
}
