import { Router } from "express";
import { obtenerLanguage } from "../controllers/language.controller.js";
// Crear el objeto router
const routes = Router();

// Definir la ruta para obtener language

routes.get("/languages", obtenerLanguage);

// Exportar el router
export default routes;
