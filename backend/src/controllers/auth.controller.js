import { AuthService } from "../services/auth.service.js";

export const AuthController = {
  // Création d’un utilisateur
  async register(req, res, next) {
    try {
      const { email, password } = req.body;

      // AuthService doit hasher le password et créer le user
      const userId = await AuthService.register(email, password);

      // Réponse sécurisée, ne jamais renvoyer le password
      res.status(201).json({ userId });
    } catch (error) {
      next(error); // Passe l'erreur au middleware global
    }
  },

  // Login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // AuthService doit vérifier mot de passe et générer JWT
      const token = await AuthService.login(email, password);

      // Ne pas exposer d’autres informations sensibles
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },

  // Vérification de l’email via token
  async verifyEmail(req, res, next) {
    try {
      const { token } = req.params;

      // AuthService vérifie le token et retourne l’utilisateur
      const user = await AuthService.verifyUser(token);

      if (!user) {
        // Message générique pour éviter fuite d’information
        return res.status(400).json({ message: "Token invalide ou expiré" });
      }

      res.status(200).json({ message: "Email vérifié avec succès" });
    } catch (error) {
      next(error);
    }
  },
};