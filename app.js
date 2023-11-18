const express = require("express");
const mssql = require("mssql");
const bodyParser = require("body-parser"); // Importa el body-parser
const cors = require("cors");

const app = express();
app.use(bodyParser.json()); // Parsear solicitudes JSON
app.use(cors());

// Configuración de la conexión a la base de datos
const dbConfig = {
  server: "localhost",
  user: "sa",
  password: "123456789",
  database: "db_erp2",
  options: {
    encrypt: false, // Deshabilita el cifrado
    trustServerCertificate: true, // Acepta cualquier certificado del servidor (INSEGURO)
  },
};

// Endpoint para obtener los usuarios "LANGUAGUES"
app.get("/languages", async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .query("SELECT [name], [code], [idLanguage] FROM security.[language]");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

// Endpoint para obtener los usuarios "MENU"
app.get("/menu", async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .query("SELECT  [name], [url], [idMenu] FROM [security].[menu]");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

// Endpoint para obtener los usuarios "PERMISSIONS"
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

// Endpoint para obtener los usuarios "AREAS"
app.get("/areas", async (req, res) => {
  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .query("SELECT  * FROM [security].[area]");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

// Endpoint para obtener los usuarios "CATEGORIES"
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

// Endpoint para obtener los usuarios "USUARIOS"
app.get("/users", async (req, res) => {
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

// Agrega una nueva ruta para actualizar un registro por ID "AREA"
app.post("/updateData", async (req, res) => {
  const { idArea } = req.body; //aqui en vez de req.body tenias req.parameter, el body se refiere a todo los datos que le pasaras como objeto o como json y no como url
  const updatedData = req.body;
  console.log("Received PUT request for ID:", idArea);

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("idArea", mssql.Int, idArea)
      .input("name", mssql.NVarChar, updatedData.name)
      .query(
        "UPDATE A SET A.[name] = @name FROM security.area A WHERE idArea = @idArea"
      );
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor", error);
  }
});

// Agrega una nueva ruta para actualizar un registro por ID "MENU"
app.post("/updateDataMenu", async (req, res) => {
  const { idMenu } = req.body;
  const updatedData = req.body;
  console.log("Received PUT request for ID:", idMenu);

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("idMenu", mssql.Int, idMenu)
      .input("name", mssql.NVarChar, updatedData.name)
      .query(
        "UPDATE A SET A.[name] = @name FROM security.menu A WHERE idmenu = @idMenu"
      );
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor", error);
  }
});

// Agrega una nueva ruta para actualizar un registro por ID "Lenguage"
app.post("/updateDataLanguage", async (req, res) => {
  const { idLanguage } = req.body;
  const updatedData = req.body;
  console.log("Received PUT request for ID:", idLanguage);

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("idLanguage", mssql.Int, idLanguage)
      .input("name", mssql.NVarChar, updatedData.name)
      .query(
        "UPDATE A SET A.[name] = @name FROM security.language A WHERE idLanguage = @idLanguage"
      );
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor", error);
  }
});

// Agrega una nueva ruta para actualizar un registro por ID "USERS"
app.post("/updateDataUser", async (req, res) => {
  const { idUser } = req.body;
  const updatedData = req.body;
  console.log("Received PUT request for ID:", idUser);

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("idUser", mssql.Int, idUser)
      .input("name", mssql.NVarChar, updatedData.name)
      .query(
        "UPDATE A SET A.[name] = @name FROM security.[user] A WHERE idUser = @idUser"
      );
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor", error);
  }
});

//Eliminar DATA de la base de datos "AREA"
app.delete("/deleteData/:idArea", async (req, res) => {
  const { idArea } = req.params;
  console.log("Received PUT request for ID:", idArea);

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("idArea", mssql.Int, idArea)

      .query("DELETE FROM security.area WHERE idArea = @idArea");
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor", error);
  }
});

//Eliminar DATA de la base de datos "Menu"
app.delete("/deleteDataMenu/:idMenu", async (req, res) => {
  const { idMenu } = req.params;
  console.log("Received PUT request for ID:", idMenu);

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("idMenu", mssql.Int, idMenu)

      .query("DELETE FROM security.menu WHERE idMenu = @idMenu");
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor", error);
  }
});

//Eliminar DATA de la base de datos "Language"
app.delete("/deleteDataLanguage/:idLanguage", async (req, res) => {
  const { idLanguage } = req.params;
  console.log("Received PUT request for ID:", idLanguage);

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("idLanguage", mssql.Int, idLanguage)

      .query("DELETE FROM security.language WHERE idLanguage = @idLanguage");
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor", error);
  }
});

//Eliminar DATA de la base de datos "User"
app.delete("/deleteDataUser/:idUser", async (req, res) => {
  const { idUser } = req.params;
  console.log("Received PUT request for ID:", idUser);

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("idUser", mssql.Int, idUser)

      .query("DELETE FROM security.[user] WHERE idUser = @idUser");
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor", error);
  }
});

//AGREGANDO INFORMACIÓN A LAS TABLAS

// Endpoint para agregar un nuevo USUARIOS
app.post("/addUser", async (req, res) => {
  const { name, userName } = req.body;

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("name", mssql.NVarChar, name)
      .input("UserName", mssql.NVarChar, userName)
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

// ...

// Agregar un nuevo área
app.post("/addArea", async (req, res) => {
  const { name } = req.body;

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("name", mssql.NVarChar, name)
      .query(
        "INSERT INTO [security].[area] ([name]) VALUES (@name); SELECT SCOPE_IDENTITY() AS newAreaId;"
      );

    const newAreaId = result.recordset[0].newAreaId;
    res.json({ success: true, newAreaId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

// Agregar un nuevo lenguage
app.post("/addLanguague", async (req, res) => {
  const { name, code } = req.body;

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("name", mssql.NVarChar, name)
      .input("code", mssql.NVarChar, code)
      .query(
        "INSERT INTO [security].[language] ([name], [code]) VALUES (@name, @code); SELECT SCOPE_IDENTITY() AS newAreaId;"
      );

    const newAreaId = result.recordset[0].newAreaId;
    res.json({ success: true, newAreaId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

//Agregar menus
app.post("/addMenu", async (req, res) => {
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

// agregar nuevo usuario
app.post("/addUsers", async (req, res) => {
  const { name, userName } = req.body;

  try {
    const pool = await mssql.connect(dbConfig);
    const result = await pool
      .request()
      .input("name", mssql.NVarChar, name)
      .input("userName", mssql.NVarChar, userName)
      .query(
        "INSERT INTO [security].[user] ([name], [userName]) VALUES (@name, @userName); SELECT SCOPE_IDENTITY() AS newUserId;"
      );

    const newUserId = result.recordset[0].newUserId;
    res.json({ success: true, newUserId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error de servidor");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
