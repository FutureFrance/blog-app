import {Request, Response, NextFunction} from 'express';
import { userService } from '../services/UserService';
import { IRegistrationData, ITokens } from '../interfaces';
import { validationResult } from 'express-validator';
import { ApiError } from '../errorHandlers/apiErrorHandler';

export class UserController {
    static async userRegistration(req: Request, res: Response, next: NextFunction): Promise<Response<IRegistrationData> | undefined> {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) throw next(ApiError.BadRequest(400, "Invalid body data", errors.array()));

            const { name, email, password } = req.body;

            const response = await userService.userRegistration(name, email, password);

            res.cookie("refreshToken", response.tokens.refreshToken, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "lax"
            });
            
            return res.status(200).json({response});
        } catch(err) {
            next(err);
        }
    }

    static async userLogin(req: Request, res: Response, next: NextFunction): Promise<Response<ITokens> | undefined> {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()) throw next(ApiError.BadRequest(400, "Invalid body data", errors.array()));

            const { email, password } = req.body;

            const tokens = await userService.userLogin(email, password);

            res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "lax"
            });

            return res.status(200).json({tokens});
        } catch(err) {
            next(err);
        }
    }

    static async refresh(req: Request, res: Response, next: NextFunction): Promise<Response<ITokens> | undefined> {
        try {
            const { refreshToken } = req.cookies;

            const tokens = await userService.refresh(refreshToken);

            res.cookie("refreshToken", tokens.refreshToken, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "lax"
            });

            return res.status(200).json({message: tokens});
        } catch(err) {
            next(err);
        }
    }
}