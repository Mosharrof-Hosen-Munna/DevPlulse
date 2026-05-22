import type { Request, Response } from "express";
import { authService } from "./auth.service";

const signupUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const createdUser = await authService.createUserIntoDB({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: createdUser,
    });
  } catch (error) {}
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

  const user = await authService.loginUserIntoDB(email, password);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export const authController = {
  signupUser,
  loginUser,
};
