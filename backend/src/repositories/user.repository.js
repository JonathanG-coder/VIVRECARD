import { db } from "../config/db.js";

export const userRepository = {
  /**
   * Création d'un utilisateur
   * - Le mot de passe doit être **hashé avant** d'être passé ici
   * - `verification_token` est généré pour la confirmation email
   * - Utilisation de requêtes préparées pour éviter l'injection SQL
   * - try/catch pour éviter crash serveur et log interne seulement
   */
  async create(user) {
    try {
      const [result] = await db.execute(
        `INSERT INTO users (email, password, verification_token) VALUES (?, ?, ?)`,
        [user.email, user.password, user.verification_token]
      );
      return result.insertId; // Retourne l'id généré
    } catch (err) {
      console.error("Error creating user:", err.message); // Log interne seulement
      throw new Error("Database error"); // Message générique pour API
    }
  },

  /**
   * Trouver un utilisateur par email
   * - Validation implicite : email doit être string
   * - Retourne null si non trouvé pour éviter undefined
   */
  async findByEmail(email) {
    if (typeof email !== "string") throw new Error("Invalid email type");
    try {
      const [rows] = await db.execute(
        `SELECT * FROM users WHERE email = ?`,
        [email]
      );
      return rows[0] ?? null;
    } catch (err) {
      console.error("Error finding user by email:", err.message);
      throw new Error("Database error");
    }
  },

  /**
   * Trouver un utilisateur par token
   * - token utilisé pour verification email
   * - Validation : token doit être string
   */
  async findByToken(token) {
    if (typeof token !== "string") throw new Error("Invalid token type");
    try {
      const [rows] = await db.execute(
        `SELECT * FROM users WHERE verification_token = ?`,
        [token]
      );
      return rows[0] ?? null;
    } catch (err) {
      console.error("Error finding user by token:", err.message);
      throw new Error("Database error");
    }
  },

  /**
   * Vérification email
   * - Met à jour is_verified à 1 et supprime le token
   * - Vérifie que userId est un nombre
   */
  async UpdateVerification(userId) {
    if (typeof userId !== "number") throw new Error("Invalid userId");
    try {
      await db.execute(
        `UPDATE users SET is_verified = 1, verification_token = NULL WHERE id = ?`,
        [userId]
      );
    } catch (err) {
      console.error("Error updating user verification:", err.message);
      throw new Error("Database error");
    }
  },

  /**
   * Mise à jour de la localisation
   * - Vérifie que latitude et longitude sont des nombres valides
   * - Met à jour last_seen à NOW() pour suivi actif
   */
  async updateLocation(userId, latitude, longitude) {
    if (typeof userId !== "number") throw new Error("Invalid userId");
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      throw new Error("Invalid latitude or longitude");
    }

    try {
      await db.execute(
        `UPDATE users SET latitude = ?, longitude = ?, last_seen = NOW() WHERE id = ?`,
        [latitude, longitude, userId]
      );
    } catch (err) {
      console.error("Error updating user location:", err.message);
      throw new Error("Database error");
    }
  },

  /**
   * Récupérer les utilisateurs actifs
   * - Filtre sur les utilisateurs ayant last_seen < 3 minutes
   * - Retourne uniquement les champs safe
   */
  async getActiveUsers() {
    try {
      const [rows] = await db.execute(
        `SELECT id, email, latitude, longitude FROM users WHERE last_seen > NOW() - INTERVAL 3 MINUTE`
      );
      return rows; // champs safe, pas de mot de passe ni token
    } catch (err) {
      console.error("Error fetching active users:", err.message);
      throw new Error("Database error");
    }
  },
};