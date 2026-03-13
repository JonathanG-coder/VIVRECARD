import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { loginSchema, registrationSchema } from "../validation/auth.validation.js";


const router = Router()

router.post('/register',validate(registrationSchema), AuthController.register)

router.post('/login',validate(loginSchema), AuthController.login)

router.get('/verify/:token', AuthController.verifyEmail)


export default router