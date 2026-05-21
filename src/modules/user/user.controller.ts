import type { Request, Response } from "express";

const createUserIntoDB = (req:Request,res:Response) => {
    res.status(201).json({
        status:'success',
        data:{
            name:'John Doe',
            email:'john.doe@example.com'
        }
    });
};

const loginUserController = (req:Request,res:Response) => {
    res.status(200).json({
        status:'success',
        message:'User logged in successfully'
    });
}

export const userController = {
    createUserIntoDB,
    loginUserController
}