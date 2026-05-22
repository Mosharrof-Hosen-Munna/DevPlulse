import bcrypt from "bcryptjs"
import { pool } from "../../db"
import type { IUser } from "../user/user.interface"
import jwt from "jsonwebtoken"
import config from "../../config"

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

const loginUserIntoDB = async (email: string, password: string) => {

  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (user.rows.length === 0) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.rows[0].password);

  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const userData = user.rows[0];
  const jwtPayload = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    createdAt: userData.createdat,
    updatedAt: userData.updatedat
  }

  const accessToken = jwt.sign(jwtPayload, config.JWT_SECRET as string, { expiresIn: "1d" });

  delete user.rows[0].password;
  return accessToken;
};

export const authService = {
    createUserIntoDB,
    loginUserIntoDB
}