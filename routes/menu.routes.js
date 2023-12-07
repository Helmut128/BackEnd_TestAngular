import { Router } from "express";
import { obtenerMenu } from "../controllers/menu.controller.js";
// Crear el objeto router
const routes = Router();

// Definir la ruta para obtener language

routes.get("/menu", obtenerMenu);

// Exportar el router
export default routes;
