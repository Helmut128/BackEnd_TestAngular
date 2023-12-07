import { Router } from "express";
import { obtenerAreas } from "../controllers/area.controller.js";
// Crear el objeto router
const routes = Router();

// Definir la ruta para obtener áreas

routes.get("/areas", obtenerAreas);

// Exportar el router
export default routes;
