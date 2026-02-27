import argon2 from "argon2"; // Bibliothèque pour le hashing sécurisé des mots de passe
import jwt from "jsonwebtoken"; // Génération des tokens JWT
import crypto from "crypto"; // Génération de valeurs aléatoires sécurisées
import { env } from "../config/env.js"; // Variables d'environnement
import { userRepository } from "../repositories/user.repository.js"; // Accès aux données utilisateur
import { MailService } from "./mail.service.js"; // Service d'envoi d’emails

export const AuthService = {
  // Inscription utilisateur
  async register(email, password) {
    // Verifie si Email deja utilisé
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new Error("Email déjà utilisé");
    }

    // Hash du mot de passe avec Argon2 (très sécurisé)
    const hashed = await argon2.hash(password);

    // Génération du token de vérification email
    const verificationToken = crypto.randomBytes(32).toString("hex");
    // Alternative possible :
    // const verificationToken = uuid4();

    // Création de l'utilisateur en base de données
    const userid = await userRepository.create({
      email,
      password: hashed,
      verificationToken,
    });

    // Envoi de l'email de vérification
    await MailService.sendVerificationEmail(email, verificationToken);

    return userid;
  },

  // Connexion utilisateur
  async login(email, password) {
    // Recherche de l'utilisateur par email
    const user = await userRepository.findByEmail(email);

    // Si l'utilisateur n'existe pas
    if (!user) throw new Error("L'utilisateur n'existe pas");

    // Vérification du mot de passe
    const valid = await argon2.verify(user.password, password);

    // Si le mot de passe est invalide
    if (!valid) throw new Error("Email ou mot de passe incorrect");

    // Génération du JWT valide 7 jours
    return jwt.sign(
      {
        id: user.id,
      },
      env.JWT_SECRET,
      { expiresIn: "7d" },
    );
  },
};
