import { Router } from "express";
import { join } from "path";

const router = Router();

router.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../../public/index.html")); // Ajuste o caminho para public
});

export default router;
