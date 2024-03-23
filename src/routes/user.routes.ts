import { Router } from "express";
import { addFile, getUsers } from "../controllers/user.controllers";
import { upload } from "../middleware/multer.middleware";

const userRouter= Router();
userRouter.get("/", getUsers);
userRouter.post("/upload",upload.single('file'),addFile)
export default userRouter ;