import e from "express";
import {
  createUsers,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  changeUser,
} from "../controller/user.js";

const userRouter = e.Router();

userRouter
  .post("/", createUsers)
  .get("/", getUsers)
  .get("/:id", getUserById)
  .put("/:id", changeUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);

export default userRouter;
