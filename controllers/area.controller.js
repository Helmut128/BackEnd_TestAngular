export async function obtenerAreas() {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .query("SELECT * FROM [security].[area]");
    return result.recordset;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default router;
