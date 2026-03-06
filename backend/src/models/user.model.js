export class User {
    // Constructeur du modèle User
    constructor({ id, email, password, latitude, longitude, is_verified, verification_token }) {
        this.id = id; // Identifiant unique de l'utilisateur
        this.email = email; // Email de l'utilisateur
        this.password = password; // Mot de passe hashé
        this.latitude = latitude; // Position géographique (latitude)
        this.longitude = longitude; // Position géographique (longitude)
        this.is_verified = is_verified; // Statut de vérification de l'email
        this.verification_token = verification_token || null;
    }
}