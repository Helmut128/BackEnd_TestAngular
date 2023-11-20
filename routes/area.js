export const obtenerAreas = async () => {
  router.get("/", async (req, res) => {
    try {
      const areas = await areasController.obtenerAreas();
      res.json(areas);
    } catch (error) {
      res.status(500).send("Error de servidor");
    }
  });
};
export default router;
