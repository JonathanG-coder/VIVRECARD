import { env } from "./src/config/env.js"; // Chargement des variables d'environnement
import app from "./src/app.js"; // Import de l'application Express

// Définition du port du serveur (priorité à la variable d'environnement)
const PORT = env.PORT || 5000;

// Démarrage du serveur Express
app.listen(PORT, () => {
  console.log(`Serveur tourne sur localhost:${PORT}`);
});