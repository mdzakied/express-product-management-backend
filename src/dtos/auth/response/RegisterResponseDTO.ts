import { UserGenderEnum } from "../../../enums/UserGenderEnum";
import { UserRoleEnum } from "../../../enums/UserRoleEnum";

// Define RegisterResponseDTO interface
export interface RegisterResponseDTO {
  status: number;
  message: string;
  user: {
    name: string;
    email: string;
    gender: UserGenderEnum;
    role: UserRoleEnum;
  };
}
