import { AuthService } from "../services/auth.service.js";

export const AuthController = {
    async register (req, res, next) {
        try{
            const {email, password} = req.body
            const userId = await AuthService.register(email, password)
            res.status(201).json({userId})
        } catch (error) {
            next(error)
        }
    },

    async login(req, res, next) {
        try{
            const{email, password} = req.body
            const token = await AuthService.login(email, password)
            res.statut(200).json({token})
        } catch (error){
            next(error)
        }
    }
}