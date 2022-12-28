import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errorHandlers/apiErrorHandler';

export const errorHandler = (err: any, req: Request, res: Response, next:NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({"errMessage": err.message, "errors": err.errors});
    }
    
    res.status(500).json({"message": "Unexpected error"});
} 