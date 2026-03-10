import express from "express"
import { createUser, createUserProfile, deleteOneUser, getAllUsers, getOneUser, login, updateOneUser } from "../controllers/userController.js";
import authorize from "../middlewares/authorize.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.post('/', upload.single('image'), createUser)

router.post('/login', login)

router.post('/userProfile', authorize(["admin","user"]), createUserProfile)

router.get('/', authorize(["admin"]), getAllUsers)

router.get('/:id',authorize(["admin","user"]), getOneUser)

router.delete('/:id',authorize(["admin"]), deleteOneUser)

router.put('/:id', authorize(["admin"]), updateOneUser)


export default router;