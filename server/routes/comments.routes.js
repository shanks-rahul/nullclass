import {Router} from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { addComment, deleteComment, getComment } from "../controllers/comment.controller.js";
const router=Router();
router.post("/",isLoggedIn,addComment);
router.get("/:videoId",getComment);
router.delete("/",isLoggedIn,deleteComment);

export default router;
