import bcrypt from "bcryptjs"
import { pool } from "../../db"
import type { IUser } from "./user.interface"

const createUserIntoDB = async(payload:IUser)=>{
    const {name,email,password,role} = payload

    const hashedPassword =await bcrypt.hash(password, 10)
    
    const createdUser = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [name,email,hashedPassword,role]
    )

    delete createdUser.rows[0].password

    return createdUser.rows[0];
}

export const userService = {
    createUserIntoDB
}