import argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { v4 as uuid4 } from "uui";
import { env } from "../config/env.js";
import { userRepository } from "../repositories/user.repository.js";
import { MailService } from "../services/mail.service.js";
import { error } from "console";

export const AuthService = {
  async register(email, password) {
    const hashed = await argon2.hash(password);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    // const verificationToken = uuid4()  // pareil que crypto ?

    const userid = await userRepository.create({
      email,
      password: hashed,
      verificationToken,
    })
    // On envoie l'email de verification
    
    await MailService.sendVerificationEmail(email, verificationToken)
    return userid
  },


  async login(email, password){
    const user = await userRepository.findByEmail(email)
    if (!user) throw new error (`Utilisateur n'existe pas`)
    
        // Le password
        const valid = await argon2.verify(user.password , password)
        if(!valid) throw new error (`Invalid creadentials`);

        // LE Token
        return jwt.sign({
            id: user.id
        },
        env.JWT_SECRET, 
        { expiresIn: "7d"},
    );
  },
};
