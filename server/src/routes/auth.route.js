import express from "express";
import {
    signup,
    userLogin,
    verifyUserToken,
    verifyAdminToken,
    logout,
} from "../controllers/index.js";
import { adminLogin } from "../controllers/admin/login.controller.js";
import { authenticate } from "../middlewares/index.js";

export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", userLogin);
authRouter.post("/admin/login", adminLogin);
authRouter.get("/verify-user-token", authenticate, verifyUserToken);
authRouter.get("/admin/verify-admin-token", authenticate, verifyAdminToken);
authRouter.get("/logout", logout);
