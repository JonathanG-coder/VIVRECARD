import nodemailer from "nodemailer"; // Bibliothèque pour l'envoi d'emails
import { env } from "../config/env.js"; // Variables d'environnement

// Création du transporter SMTP
const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST, // Serveur SMTP
    port: 587, // Port SMTP standard pour TLS
    secure: false, // false car on utilise le port 587
    auth: {
        user: env.SMTP_USER, // Identifiant SMTP
        pass: env.SMTP_PASS // Mot de passe SMTP
    },
});

// Vérification de la connexion SMTP au démarrage
transporter.verify((error, success) => {
    if (error) {
        console.error("Echec à la connexion au service SMTP");
    } else {
        console.log("Connexion SMTP reussie :", success);
    }
});

// Service d'envoi d'emails
export const MailService = {
    // Envoi de l'email de vérification
    async sendVerificationEmail(email, token) {
        // Génération du lien de vérification
        const link = `${env.CLIENT_URL}/verify/${token}`;

        // Envoi de l'email via SMTP
        await transporter.sendMail({
            from: `"VivreCard" <${env.SMTP_SENDER}>`,
            to: email,
            subject: "Vérification de votre email",
            html: `<p>Cliquez sur ce lien pour vérifier votre compte : <a href="${link}">${link}</a></p>`
        });
    }
};