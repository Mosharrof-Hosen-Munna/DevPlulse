import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser= async (req:Request,res:Response) => {
    const {name,email,password,role} = req.body

    const createdUser = await userService.createUserIntoDB({name,email,password,role})

    res.status(201).json({
        success:true,
        message:'User created successfully',
        data:createdUser
    });
};

const loginUserController = async (req:Request,res:Response) => {
    const {email,password} = req.body

    res.status(200).json({
        status:'success',
        message:'User logged in successfully'
    });
}

export const userController = {
    createUser,
    loginUserController
}