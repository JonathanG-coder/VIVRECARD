import { db } from "../config/db.js";


// Création d'un utilisateur.
export const userRepository = {

  // Création d'un utilisateur
  async create(user) {
    const [result] = await db.execute(
      `INSERT INTO users (email, password, verification_token)
       VALUES (?, ?, ?)`,
      [user.email, user.password, user.verificationToken]
    );

    return result.insertId;
  },


  // Trouver un utilisateur par rapport à son email
  async findByEmail(email) {
    const [rows] = await db.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    return rows[0];
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


  // Récupérer les utilisateurs actifs (actifs depuis 3 minutes)
  async getActiveUsers() {
    const [rows] = await db.execute(
      `SELECT id, email, latitude, longitude
       FROM users
       WHERE last_seen > NOW() - INTERVAL 3 MINUTE`
    );

    return rows;
  }

};