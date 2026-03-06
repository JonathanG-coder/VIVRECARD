import { Router } from "express"; // Création du routeur Express
import { AuthController } from "../controllers/auth.controller.js"; // Controller d'authentification
import { loginSchema, registrationSchema } from "../validation/auth.validation.js";
import { validate } from "../middlewares/validation.middleware.js";

const router = Router(); // Initialisation du routeur

// Route d'inscription
router.post("/register",validate(registrationSchema), AuthController.register);

// Route de connexion
router.post("/login",validate(loginSchema), AuthController.login);


router.get('/verify/:token', AuthController.verifyEmail)

export default router; // Export du routeur pour l'utiliser dans app.js