import { Router } from "express";
import { getLavados, prueba, testing } from "../controllers/controls.js";
import { ingresoUsuario, registroUsuario } from "../controllers/login.js";
import { loginMiddle } from "../middlewares/validate.middleware.js";
import { schemaLogin } from "../schemas/login.schema.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/", testing);

router.post("/home",isAuth, prueba);
router.get("/lavados", getLavados);
router.post("/ingreso", loginMiddle({ schema: schemaLogin }), ingresoUsuario);
router.post("/registro", registroUsuario);

export default router;
