import { IOccupation } from "./occupation.interface";

export interface ICharacter {
  char_id: number;
  name: string;
  nickname: string;
  img: string;
  status: string;
  occupation: IOccupation[];
}
