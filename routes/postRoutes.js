import express from "express"
import { createPost, getAllPosts } from "../controllers/postController.js";
import authorize from "../middlewares/authorize.js";
const router = express.Router();

router.post('/',authorize(["admin","user"]), createPost)

router.get('/all', authorize(["admin","user"]), getAllPosts)


export default router;