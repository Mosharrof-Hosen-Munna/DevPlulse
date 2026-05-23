import { pool } from "../../db";
import type { UpdatePayload } from "../../types";

const createIssueIntoDB = async (payload: any) => {
  const { title, description, type, reporter_id } = payload;

  const result = await pool.query(
    "INSERT INTO issues (title, description, type, status, reporter_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [title, description, type, 'open', reporter_id]
  );

  return result.rows[0];
};

const getAllIssuesFromDB = async ({ sort, type, status }: { sort?: string; type?: string; status?: string }) => {
    let query = `SELECT
        issues.id,
        issues.title,
        issues.description,
        issues.type,
        issues.status,
        issues.created_at,
        issues.updated_at,

        users.id AS reporter_id,
        users.name AS reporter_name,
        users.role AS reporter_role

      FROM issues

      INNER JOIN users
      ON issues.reporter_id = users.id`;
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

const getSingleIssueFromDB = async (id: number) => {
    const result = await pool.query(
        `SELECT
            issues.id,
            issues.title,
            issues.description,
            issues.type,
            issues.status,
            issues.created_at,
            issues.updated_at,

            users.id AS reporter_id,
            users.name AS reporter_name,
            users.role AS reporter_role

        FROM issues

        INNER JOIN users
        ON issues.reporter_id = users.id

        WHERE issues.id = $1`,
        [id]
    );

    return result.rows[0];
};

const updateIssueInDB = async (
  issueId: number,
  user: { id: number; role: string },
  payload: UpdatePayload
) => {

  try {
    const issueResult = await pool.query(
    "SELECT * FROM issues WHERE id = $1",
    [issueId]
  );

  if (issueResult.rows.length === 0) {
    throw new Error("NOT_FOUND");
  }

  const issue = issueResult.rows[0];

  const isMaintainer = user.role === "maintainer";
  const isOwner = issue.reporter_id === user.id;

  if (!isMaintainer) {
    if (!isOwner) {
      throw new Error("FORBIDDEN");
    }

    if (issue.status !== "open") {
      throw new Error("ONLY_OPEN_ALLOWED");
    }
  }

  const allowedFields = ["title", "description", "type"];

  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  for (const [key, value] of Object.entries(payload)) {
    if (allowedFields.includes(key) && value !== undefined) {
      fields.push(`${key} = $${index}`);
      values.push(value);
      index++;
    }
  }

  if (fields.length === 0) {
    throw new Error("NO_VALID_FIELDS");
  }

  const query = `
    UPDATE issues 
    SET ${fields.join(", ")} 
    WHERE id = $${index} 
    RETURNING *
  `;

  const result = await pool.query(query, [...values, issueId]);

  return result.rows[0];
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "An error occurred while updating the issue");
  }
};

const deleteIssueFromDB = async (
  issueId: number,
  user: { role: string }
) => {

  try {
    if (user.role !== "maintainer") {
    throw new Error("FORBIDDEN");
  }

  const issueResult = await pool.query(
    "SELECT id FROM issues WHERE id = $1",
    [issueId]
  );

  if (issueResult.rows.length === 0) {
    throw new Error("NOT_FOUND");
  }

  await pool.query(
    "DELETE FROM issues WHERE id = $1",
    [issueId]
  );

  return true;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "An error occurred while deleting the issue");
  }
};
export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueInDB,
  deleteIssueFromDB
};
