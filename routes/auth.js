import e from "express";
import { signup, login } from "../controller/auth.js";

const authRouter = e.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login)

export default authRouter