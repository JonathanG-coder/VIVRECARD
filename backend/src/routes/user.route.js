import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

import { updateLocationSchema } from "../validation/user.validation.js";
import { validate } from "../middlewares/validation.middleware.js";

const router = Router()

router.put('/location', validate(updateLocationSchema), UserController.updateLocation)

router.get('/active', UserController.getActiveUsers)


export default router