import type { Request, Response } from "express";




const loginUserController = async (req:Request,res:Response) => {
    const {email,password} = req.body

    res.status(200).json({
        status:'success',
        message:'User logged in successfully'
    });
}

export const userController = {
    loginUserController
}