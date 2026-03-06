import { AuthService } from "../services/auth.service.js"; // Service métier pour l'authentification

export const AuthController = {
    // Controller pour l'inscription utilisateur
    async register(req, res, next) {
        try {
            // Récupération des données envoyées par le client
            const { email, password } = req.body;

            // Appel du service d'inscription
            const userId = await AuthService.register(email, password);

            // Réponse HTTP : utilisateur créé
            res.status(201).json({ userId });
        } catch (error) {
            // Transmission de l'erreur au middleware global
            next(error);
        }
    },

    // Controller pour la connexion utilisateur
    async login(req, res, next) {
        try {
            // Récupération des données envoyées par le client
            const { email, password } = req.body;

            // Appel du service de login
            const token = await AuthService.login(email, password);
            
             // Réponse HTTP : utilisateur connecté
            res.status(200).json({ token });
        } catch (error) {
            // Gestion de l'erreur via middleware global
            next(error);
        }
    },

    async verifyEmail(req, res, next) {
        try {

        // Récupère le token présent dans l'URL
        const { token } = req.params;

        // Vérifie le token avec le service d'authentification
        const user = await AuthService.verifyUser(token);

        // Si le token est invalide ou expiré
        if (!user) {
            return res.status(400).json({
                message: "Token invalide ou expiré"
            });
        }

        // Si la vérification réussit
        res.status(200).json({
            message: "Email vérifié avec succès"
        });

     } catch (error) {

        // Envoie l'erreur au middleware global
        next(error);
    }
}
};