import express from "express";
import { getUser } from "../controllers/user";
import { GET_USER } from "../constants/router";

const router = express.Router();

router.get(GET_USER, getUser);

export default router;
