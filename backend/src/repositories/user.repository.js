import { db } from "../config/db.js"; // Connexion à la base de données

export const userRepository = {

  // Création d'un utilisateur dans la base de données
  async create(user) {
    const [result] = await db.execute(
      `INSERT INTO users (email, password, verification_token)
       VALUES (?, ?, ?)`,
      [user.email, user.password, user.verificationToken]
    );

    // Retourne l'ID de l'utilisateur créé
    return result.insertId;
  },

  // Trouver un utilisateur par email
  async findByEmail(email) {
    const [rows] = await db.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    return rows[0]; // Retourne le premier utilisateur trouvé
  },

  // Mettre à jour la localisation de l'utilisateur
  async updateLocation(userId, lat, lng) {
    await db.execute(
      `UPDATE users
       SET latitude = ?, longitude = ?, last_seen = NOW()
       WHERE id = ?`,
      [lat, lng, userId]
    );
  },

  // Récupérer les utilisateurs actifs (connectés récemment)
  async getActiveUsers() {
    const [rows] = await db.execute(
      `SELECT id, email, latitude, longitude
       FROM users
       WHERE last_seen > NOW() - INTERVAL 3 MINUTE`
    );

    return rows;
  }

};