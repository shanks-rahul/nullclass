import { Router } from "express";
import { getLoggedInUserDetails, login, logout, register, updateToken, updateUser } from "../controllers/user.controllers.js";
import upload from "../middleware/multer.middleware.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const router=Router();
router.post("/signup",upload.single('avatar'),register);
router.post("/signin",login);
router.post("/logout",logout);
router.get("/me",isLoggedIn,getLoggedInUserDetails);
router.put("/update/:id",isLoggedIn,upload.single('avatar'),updateUser);
router.get("/updateToken/:id",isLoggedIn,updateToken);

export default router;