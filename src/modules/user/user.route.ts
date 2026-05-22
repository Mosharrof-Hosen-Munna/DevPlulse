import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();


router.post('/login', userController.loginUserController)

export const userRoutes = router;