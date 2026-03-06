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


// Chercher un utilisateur avec son token de vérification email
async findByVerificationToken(token) {
    const [rows] = await db.execute(
        'SELECT * FROM users WHERE verification_token = ?',
        [token]
    );
    return rows[0];
},

// Mettre à jour le statut de vérification de l'utilisateur
async updateVerification(userId) {
    await db.execute(
        'UPDATE users SET is_verified = 1, verification_token = NULL WHERE id = ?',
        [userId]
    );
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

  // Récupérer les utilisateurs actifs chaque 3 minutes pour le moement(connectés récemment)
  async getActiveUsers() {
    const [rows] = await db.execute(
      `SELECT id, email, latitude, longitude
       FROM users
       WHERE last_seen > NOW() - INTERVAL 3 MINUTE`
    );

    return rows;
  }

};