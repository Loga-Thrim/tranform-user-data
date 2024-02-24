import express from "express";
import User from "./routers/user";
import { PORT } from "./constants/common";

const app = express();

app.use(User).listen(PORT, () => {
  console.log("> App on port 5500.");
});
