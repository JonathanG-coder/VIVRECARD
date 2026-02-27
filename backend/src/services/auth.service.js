import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { v4 as uuid4 } from "uuid";
import { env } from "../config/env.js";
import { userRepository } from "../repositories/user.repository.js";
import { MailService } from "./mail.service.js";

export const AuthService = {
  async register(email, password) {
    const hashed = await argon2.hash(password);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    // const verificationToken =  uuid4()

    const userid = await userRepository.create({
      email,
      password: hashed,
      verificationToken,
    });

    // On envoie l'email de vérification

    await MailService.sendVerificationEmail(email, verificationToken);

    return userid;
  },

  async login(email, password) {
    // email
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("L'utilsateur n'existe pas ");

    // password
    const valid = await argon2.verify(user.password, password);
    if (!valid) throw new Error("Invalid creadentials");

    // Le token

    return jwt.sign(
      {
        id: user.id,
      },
      env.JWT_SECRET,
      { expiresIn: "7d" },
    );
  },
};