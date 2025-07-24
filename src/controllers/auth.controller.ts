import { Request, Response } from "express"
import * as authService from "@/services/auth.service"
import logger from "@/utils/logger"

export const register = async (req: Request, res: Response) => {
    try{
        const { name, email, password } = req.body;
        const user = authService.registerUser(name, email, password)
        res.status(200).json({
            message: "User registered",
            user
        })
    }
    catch(e: Error) {
        logger.error(e)
        res.status(500).json({
            message: e.message
        })
    }
}


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    logger.error(error);
    res.status(401).json({ message: error.message });
  }
};