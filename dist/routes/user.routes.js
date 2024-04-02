"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const multer_middleware_1 = require("../middleware/multer.middleware");
const userRouter = (0, express_1.Router)();
userRouter.get("/", user_controllers_1.getUsers);
userRouter.post("/upload", multer_middleware_1.upload.single('file'), user_controllers_1.addFile);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map