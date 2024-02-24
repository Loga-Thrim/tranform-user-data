import express from "express";
import { IUserResponse } from "./models";
import { transformUserData } from "./services/user";
import { PORT, USER_API } from "./constants/common";

const app = express();

app
  .get("/get-user", async (req, res) => {
    const fetchUsers = await fetch(USER_API);
    const { users } = (await fetchUsers.json()) as IUserResponse;

    const newUsers = transformUserData(users);

    res.json(newUsers);
  })
  .listen(PORT, () => {
    console.log("> App on port 5500.");
  });
