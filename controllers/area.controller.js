import { dbConfig } from "../conextion/dbConfig.js";
import mssql from "mssql";

//no uses el controlador, por alguna razon no funciona ya que no
// Conecta con el router
export const obtenerAreas = async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .query("SELECT * FROM [security].[area]");
    return res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
