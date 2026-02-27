// Ecrire dans terminal  /backend : node src/test/smtp.test.js
// reponse attendue : Connexion SMTP Brevo OK
// Si ok remettre tous en commentaire.


// import nodemailer from "nodemailer";
// import { env } from "../config/env.js";

// const transporter = nodemailer.createTransport({
//   host: env.SMTP_HOST,
//   port: 587,
//   secure: false,
//   auth: {
//     user: env.SMTP_USER,
//     pass: env.SMTP_PASS
//   }
// });

// async function testEmail() {
//   try {
//     await transporter.verify();
//     console.log("Connexion SMTP Brevo OK");
//   } catch (err) {
//     console.error("Erreur connexion SMTP :", err);
//   }
// }

// testEmail();

