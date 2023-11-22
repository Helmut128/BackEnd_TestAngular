// Configuración de la conexión a la base de datos
export const dbConfig = {
  server: "localhost",
  user: "sa",
  password: "*********",
  database: "db_erp2",
  options: {
    encrypt: false, // Deshabilita el cifrado
    trustServerCertificate: true, // Acepta cualquier certificado del servidor (INSEGURO)
  },
};
