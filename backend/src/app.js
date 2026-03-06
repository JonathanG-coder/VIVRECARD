import express from "express"; // Framework serveur
import cors from "cors"; // Autorise les requêtes cross-origin
import helmet, { contentSecurityPolicy } from "helmet"; // Sécurise les headers HTTP
import rateLimit from "express-rate-limit"; // Limite les requêtes (anti-spam / brute force)
import { errorHandle } from "./middlewares/error.middleware.js"; // Middleware global d'erreurs
import  authRoutes  from "./routes/auth.routes.js"; // Routes d'authentification
import userRoutes from "./routes/user.route.js"
import {env} from "./config/env.js"

const app = express(); // Création de l'application Express

// Sécurité des headers HTTP
app.use(helmet(
  {contentSecurityPolicy: false} // Active en production avec la config adapté
  //En production on peut l'utiliser en http . Voir si bien a garder ?
));

// Autorise les requêtes du frontend
app.use(cors(
  { origin: env.CLIENT_URL || "*",   // Supprimer l'étoile une fois test fini !!!
    credentials: true
  }
));

// Permet de lire le JSON dans les requêtes
app.use(express.json());

// Protection contre les abus (50 requêtes max toutes les 15 minutes par IP)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50,
  })
);


// Limiter les requetes par client
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives pour le moment, voir plus tard si plus ou moins 
  message: {error: "Trop de tentative , réessayer plus tard!"}
})

// Routes d'authentification
app.use("/api/auth",authLimiter, authRoutes);

// Routes pour les users
app.use("/api/users",authLimiter, userRoutes);

// Middleware global de gestion des erreurs (toujours en dernier)
app.use(errorHandle);

export default app; // Export pour server.js