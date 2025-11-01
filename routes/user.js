import e from "express";
import {
  updateUser,
  getAllUsers,
  deleteUser,
  changeUser,
} from "../controller/user.js";

const userRouter = e.Router();

userRouter
  .get("/", getAllUsers)
  // .get("/:id", getUserById)
  .put("/:id", changeUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);

export default userRouter;
