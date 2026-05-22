import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { NextFunction, Request, Response } from "express";
import config from '../config';
import { pool } from '../db';

const auth = async(req: Request, res: Response, next: NextFunction) => { 
    try {
        const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided",
        });
    }

    const decodedToken = jwt.verify(token, config.JWT_SECRET as string)  as JwtPayload;
   

    const userData = await pool.query('SELECT * FROM users WHERE id = $1', [decodedToken.id]);

    if (userData.rows.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Unauthorized: User not found",
        });
    }

    req.user = decodedToken
    next();
    } catch (error) {
        next(error);
    }
}

export default auth;