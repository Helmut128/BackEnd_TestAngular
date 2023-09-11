const express = require("express");
const mssql = require("mssql");
const bodyParser = require("body-parser"); // Importa el body-parser
const cors = require("cors");

const app = express();
app.use(bodyParser.json()); // Parsear solicitudes JSON
app.use(cors());

// Configuración de la conexión a la base de datos
const dbConfig = {
  server: "localhost", // Cambia esto con la dirección de tu servidor SQL Server
  user: "sa", // Cambia esto con tu usuario de SQL Server
  password: "123456789", // Cambia esto con tu contraseña
  database: "db_erp2", // Cambia esto con el nombre de tu base de datos
  options: {
    encrypt: false, // Deshabilita el cifrado
    trustServerCertificate: true, // Acepta cualquier certificado del servidor (INSEGURO)
  },
};

// Endpoint para obtener los usuarios
app.get("/languages", async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .query("SELECT [name], [code]  FROM security.[language]");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

// Endpoint para obtener los usuarios
app.get("/menu", async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .query("SELECT  [name], [url] FROM [security].[menu]");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

// Endpoint para obtener los usuarios
app.get("/permissions", async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .query("SELECT [name], isActiveLog FROM [security].[permission]");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

// Endpoint para obtener los usuarios
app.get("/areas", async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .query("SELECT  [name], isActiveLog FROM [security].[area]");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

// Endpoint para obtener los usuarios
app.get("/categories", async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .query("SELECT [name] FROM [project].[category]");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

// Endpoint para obtener los usuarios
app.get("/users", async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .query("SELECT [name], [userName], [alias] FROM [security].[user]");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

// Endpoint para crear un nuevo usuario
app.post("/users", async (req, res) => {
  const { name } = req.body;

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("name", mssql.NVarChar, name)
      .query(
        "INSERT INTO [security].[user] ([name]) VALUES (@name); SELECT SCOPE_IDENTITY() AS newUserId;"
      );

    const newUserId = result.recordset[0].newUserId;
    res.json({ success: true, newUserId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

//Agregar lenguage
app.post("/addLenguage", async (req, res) => {
  const { name } = req.body;

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("name", mssql.NVarChar, name)
      .query(
        "INSERT INTO [security].[language] ([name]) VALUES (@name); SELECT SCOPE_IDENTITY() AS newUserId;"
      );

    const newUserId = result.recordset[0].newUserId;
    res.json({ success: true, newUserId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

//Agregar permisos
app.post("/permissions", async (req, res) => {
  const { name, id } = req.body;

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("name", mssql.NVarChar, name)
      .input("id", mssql.Int, id)
      .query(
        "INSERT INTO [security].[permission] ([name], [idPermissionSub]) VALUES (@name, @id); SELECT SCOPE_IDENTITY() AS newUserId;"
      );

    const newUserId = result.recordset[0].newUserId;
    res.json({ success: true, newUserId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

//Agregar area
app.post("/areas", async (req, res) => {
  const { name, isActiveLog } = req.body;

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("name", mssql.NVarChar, name)
      .input("isActiveLog", mssql.Bit, isActiveLog)
      .query(
        "INSERT INTO [security].[area] ([name], [isActiveLog]) VALUES (@name, @isActiveLog); SELECT SCOPE_IDENTITY() AS newAreaId;"
      );

    const newAreaId = result.recordset[0].newAreaId;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

//Agregar menus
app.post("/menu", async (req, res) => {
  const { name, url } = req.body;

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("name", mssql.NVarChar, name)
      .input("url", mssql.NVarChar, url)
      .query(
        "INSERT INTO [security].[menu] ([name], [url]) VALUES (@name, @url); SELECT SCOPE_IDENTITY() AS newMenuId;"
      );

    const newMenuId = result.recordset[0].newMenuId;
    res.json({ success: true, newMenuId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
