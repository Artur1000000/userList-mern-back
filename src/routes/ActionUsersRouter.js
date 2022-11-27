import { Router } from "express";
import {
  blockUsers,
  deleteUsers,
  unblockUsers,
} from "../controllers/actionUsers.js";
import { getUsers } from "../controllers/getUsers.js";
import checkMeAuth from "../utils/checkMeAuth.js";
import { lookStatusUser } from "../utils/lookStatusUser.js";

const BlockUsersRoute = new Router();

BlockUsersRoute.patch(
  "/block-users",
  checkMeAuth,
  lookStatusUser,
  blockUsers,
  getUsers
);

const UnblockUsersRoute = new Router();

UnblockUsersRoute.patch(
  "/unblock-users",
  checkMeAuth,
  lookStatusUser,
  unblockUsers,
  getUsers
);

const DeleteUsersRoute = new Router();

DeleteUsersRoute.put(
  "/delete-users",
  checkMeAuth,
  lookStatusUser,
  deleteUsers,
  getUsers
);

export { BlockUsersRoute, UnblockUsersRoute, DeleteUsersRoute };
