const express = require("express");
const mssql = require("mssql");
const bodyParser = require("body-parser"); // Importa el body-parser
const cors = require("cors");

const app = express();

// Configuración de la conexión a la base de datos
export const dbConfig = {
  server: "localhost",
  user: "sa",
  password: "123456789",
  database: "db_erp2",
  options: {
    encrypt: false, // Deshabilita el cifrado
    trustServerCertificate: true, // Acepta cualquier certificado del servidor (INSEGURO)
  },
};
