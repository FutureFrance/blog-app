import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ApiError } from '../errorHandlers/apiErrorHandler';
import { ITokenData } from '../interfaces';

dotenv.config();

const ACCESSKEY = process.env.ACCESSKEY as string;

export const checkAuth = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const accessToken = (req.headers.authorization || '').replace(/Bearer\s?/, '');

        const validToken = jwt.verify(accessToken, ACCESSKEY) as ITokenData;

        if (!validToken) throw ApiError.Unauthorized();

        req.headers.user = validToken['id'] || "invalid";
        req.headers.role = String(validToken['role']) || "invalid";
        next();
    } catch(err) {
        next(ApiError.Unauthorized());
    }
}