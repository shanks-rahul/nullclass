import { Router } from "express";
import { addVideos, deleteVideo, getAllVideos } from "../controllers/video.controller.js";
import { authorizedRole, isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
const router=Router();
router.get("/",getAllVideos);
router.post("/",isLoggedIn,authorizedRole("ADMIN"),upload.single('video'),addVideos);
router.delete("/:id",isLoggedIn,authorizedRole("ADMIN"),deleteVideo);

export default router;