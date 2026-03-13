export const errorHandle = (err, req, res, next) => {
  // Logging interne sécurisé
  // Attention : ne pas loguer de données sensibles comme passwords ou tokens
  console.error("Internal error:", err);

  // Définition du status HTTP
  const status = err.status || 500;

  // Message générique pour éviter exposition de détails internes
  const message =
    err.message && process.env.NODE_ENV !== "production"
      ? err.message
      : "Une erreur serveur est survenue";

  // Réponse JSON structurée
  res.status(status).json({
    success: false,
    message,
  });
};