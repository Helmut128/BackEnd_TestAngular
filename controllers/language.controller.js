import { dbConfig } from "../conextion/dbConfig.js";
import mssql from "mssql";

export const obtenerLanguage = async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .query("SELECT [name], [code], [idLanguage] FROM security.[language]");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
