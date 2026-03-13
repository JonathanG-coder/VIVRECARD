import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const authenticate = (req, res, next) => {
  try {
    // Vérification que le header Authorization est présent
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Non autorisé" });
    }

    // Extraction du token
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Non autorisé" });

    // Vérification et décodage du token
    const decoded = jwt.verify(token, env.JWT_SECRET);

    // Stocker uniquement les données safe dans req.user
    req.user = { id: decoded.id, email: decoded.email }; 

    next(); // Passe au middleware suivant ou à la route
  } catch (error) {
    // Ne pas exposer les détails de l'erreur (expired, invalid, malformed)
    console.error("Authentication failed:", error.message);
    return res.status(401).json({ message: "Non autorisé" });
  }
};