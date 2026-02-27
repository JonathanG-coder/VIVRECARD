import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Echec à la connexion au service SMTP");
    } else {
        console.log("Connexion SMTP reussie :", success);
    }
});

export const MailService = {
    async sendVerificationEmail(email, token) {
        const link = `${env.CLIENT_URL}/verify/${token}`;

        await transporter.sendMail({
            from: `"VivreCard" <${env.SMTP_SENDER}>`,
            to: email,
            subject: "Vérification de votre email",
            html: `<p>Cliquez sur ce lien pour vérifier votre compte : <a href="${link}">${link}</a></p>`
        });
    }
};