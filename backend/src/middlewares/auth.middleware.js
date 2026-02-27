import jwt from "jsonwebtoken"; // Bibliothèque pour vérifier et décoder les tokens JWT
import { env } from "../config/env.js"; // Variables d'environnement

// Middleware d'authentification JWT
export const authenticate = (req, res, next) => {
  // Récupère le token dans le header Authorization (format : Bearer TOKEN)
  const token = req.headers.authorization?.split(" ")[1];

  // Vérifie si le token existe
  if (!token) {
    return res.status(401).json({ message: "Pas d'autorisation" });
  }

  try {
    // Vérifie la validité du token avec la clé secrète JWT
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // Stocke les informations utilisateur décodées dans la requête
    req.user = decoded;

    // Passe au middleware suivant
    next();
  } catch (error) {
    // Si le token est invalide ou expiré
    return res.status(401).json({ message: "Token invalide" });
  }
};