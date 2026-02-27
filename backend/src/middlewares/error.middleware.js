 // Middleware global de gestion des erreurs
export const errorHandle = (err, req, res, next) => {
    // Affiche l’erreur dans la console pour le debugging
    console.error(err);

    // Définit le statut HTTP (par défaut 500 si non défini)
    const status = err.status || 500;

    // Message d’erreur envoyé au client
    const message = err.message || "Une erreur interne du serveur";

    // Réponse JSON envoyée au frontend
    res.status(status).json({
        success: false,
        message
    });
};