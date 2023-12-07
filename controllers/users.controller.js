import { dbConfig } from "../conextion/dbConfig.js";
import mssql from "mssql";

export const obtenerUsers = async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .query(
        "SELECT [name], [userName], [alias], [idUser] FROM [security].[user]"
      );
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
