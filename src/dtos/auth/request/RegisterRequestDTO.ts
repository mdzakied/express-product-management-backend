import { UserGenderEnum } from "../../../enums/UserGenderEnum";

// Define RegisterRequestDTO interface
export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
  gender: UserGenderEnum;
}
