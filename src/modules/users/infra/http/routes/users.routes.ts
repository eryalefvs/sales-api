import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate"
import multer from "multer"
import uploadConfig from "@config/upload"
import UserController from "../controllers/UserController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import UserAvatarController from "../controllers/UserAvatarController.ts";

const usersRouter = Router();
const usersController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig)

usersRouter.get("/", isAuthenticated, usersController.index);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }
  }),
  usersController.create
)

usersRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  userAvatarController.update,
)

export default usersRouter;
