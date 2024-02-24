import { USER_API } from "../constants/common";
import { IUserResponse } from "../models";
import { transformUserData } from "../services/user";

export const getUser = async (req, res) => {
  const fetchUsers = await fetch(USER_API);
  const { users } = (await fetchUsers.json()) as IUserResponse;

  const newUsers = transformUserData(users);

  res.json(newUsers);
};
