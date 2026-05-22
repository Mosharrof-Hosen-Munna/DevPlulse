import type { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
    try {

        
        const users = await userService.fetchAllUsersFromDB();
   res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: users,
    });
    } catch (error: any) {
        console.log(error.message
        )
    }
}




export const userController = {
    getAllUsers
}