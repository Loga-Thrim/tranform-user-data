import express from "express";
import { IUserResponse } from "./models";
import { transformUserData } from "./services/user";

const app = express();

app
  .get("/get-user", async (req, res) => {
    const fetchUsers = await fetch("https://dummyjson.com/users");
    const { users } = (await fetchUsers.json()) as IUserResponse;

    const newUsers = transformUserData(users);

    res.json(newUsers);
  })
  .listen(5500, () => {
    console.log("> App on port 5500.");
  });
