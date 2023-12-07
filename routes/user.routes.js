import { Router } from "express";
import { obtenerUsers } from "../controllers/users.controller.js";
// Crear el objeto router
const routes = Router();

// Definir la ruta para obtener language

routes.get("/users", obtenerUsers);

// Exportar el router
export default routes;
