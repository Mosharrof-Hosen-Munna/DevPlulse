import { pool } from "../../db";

const createIssueIntoDB = async (payload: any) => {
  const { title, description, type, reporter_id } = payload;

  const result = await pool.query(
    "INSERT INTO issues (title, description, type, status, reporter_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [title, description, type, 'open', reporter_id]
  );

  return result.rows[0];
};

const getAllIssuesFromDB = async ({ sort, type, status }: { sort?: string; type?: string; status?: string }) => {
    let query = `SELECT * FROM issues`;
    const conditions: string[] = [];
    const values: any[] = [];


   if (type) {
      values.push(type);
      conditions.push(`type = $${values.length}`);
    }

   if (status) {
      values.push(status);
      conditions.push(`status = $${values.length}`);
    }

     if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }


 query += `
      ORDER BY created_at ${
        sort === "oldest" ? "ASC" : "DESC"
      }
    `;

  const result = await pool.query(query, values);

    return result.rows;
};

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB
};