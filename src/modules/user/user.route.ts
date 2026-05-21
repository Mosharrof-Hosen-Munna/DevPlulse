import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post('/signup', userController.createUserIntoDB);
router.post('/login', userController.loginUserController)

export const userRoutes = router;