import { Router } from "express"; // Création du routeur Express
import { AuthController } from "../controllers/auth.controller.js"; // Controller d'authentification

const router = Router(); // Initialisation du routeur

// Route d'inscription
router.post("/register", AuthController.register);

// Route de connexion
router.post("/login", AuthController.login);

export default router; // Export du routeur pour l'utiliser dans app.js