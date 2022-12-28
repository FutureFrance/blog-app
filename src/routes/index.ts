import { UserController } from "../controllers/UserController";
import { Router } from "express";
import * as userValidate from "../validations/userValidate";
import * as postValidate from '../validations/postValidate';
import { PostController } from "../controllers/PostController";
import { checkAuth } from "../middlewares/checkAuth";

const router = Router();

router.post("/register", userValidate.registration, UserController.userRegistration);
router.post("/login", userValidate.login, UserController.userLogin);
router.get("/refresh", UserController.refresh);

router.post("/post/create", checkAuth, postValidate.create, PostController.createPost);
router.post("/post/changestate", checkAuth, postValidate.changeState, PostController.changeState);
router.get("/profile/posts", checkAuth, PostController.getProfilePosts);
router.delete("/post/remove/:id", checkAuth, PostController.removePost);
router.put("/post/update", checkAuth, postValidate.update, PostController.updatePost);

router.get("/posts", PostController.getPosts);

export default router;