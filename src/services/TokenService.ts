import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ITokenData, ITokens} from '../interfaces';

dotenv.config();

const ACCESSKEY = process.env.ACCESSKEY as string;
const REFRESHKEY = process.env.REFRESHKEY as string;

class TokenService {
    async generateTokens(payload: ITokenData): Promise<ITokens> {
        const accessToken = jwt.sign(payload, ACCESSKEY, {expiresIn: "60m"});
        const refreshToken = jwt.sign(payload, REFRESHKEY, {expiresIn: "30d"});

        return { accessToken, refreshToken }
    }
}

export const tokenService = new TokenService();