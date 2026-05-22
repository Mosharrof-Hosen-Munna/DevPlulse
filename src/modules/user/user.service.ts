
import { pool } from "../../db"


const fetchAllUsersFromDB = async () => {
    const users = await pool.query('SELECT id, name, email, role, created_at, updated_at FROM users');
    return users.rows;
}

export const userService = {
    fetchAllUsersFromDB
}