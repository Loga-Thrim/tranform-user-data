import { IUser } from "./user";

export interface IUserResponse {
  users: IUser[];
  total: number;
  skip: number;
  limit: number;
}
