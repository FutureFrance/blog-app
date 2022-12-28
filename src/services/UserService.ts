import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { ApiError } from '../errorHandlers/apiErrorHandler';
import { UserModel } from '../models/user';
import { IRegistrationData, ITokenData, ITokens } from '../interfaces';
import { tokenService } from './TokenService';
import { TokenModel } from '../models/token';

dotenv.config();

const SALT = process.env.SALT as string;
const REFRESHKEY = process.env.REFRESHKEY as string;

class UserService {
    async userRegistration(name: string, email: string, password: string): Promise<IRegistrationData> {
        const isUser = await UserModel.findOne({ 
            where: { email }
        }).catch(err => { throw ApiError.BadRequest(500, "Fatal Error trying to find the user") });

        if(isUser) throw ApiError.BadRequest(400, "User with this email already exists");

        const passwordHash = await bcrypt.hash(password, parseInt(SALT));

        const user = await UserModel.create({
            name: name,
            email: email,
            password: passwordHash,
            is_admin: false
        }, { fields: ['name', 'email', 'password'] })
        .catch(err => { throw ApiError.BadRequest(500, "Fatal Error trying to register user") });

        const tokens = await tokenService.generateTokens({id: String(user.id), role: 333});

        const saveToken = await TokenModel.create({
            token: tokens.refreshToken,
            user: user.id
        }).catch(err => { throw ApiError.BadRequest(500, "Fatal Error trying to create the tokens") });
       
        return { user, tokens };
    }

    async userLogin(email: string, password: string): Promise<ITokens> {
        const user = await UserModel.findOne({
            where: { email }
        }).catch(err => { throw ApiError.BadRequest(500, "Fatal Error trying to find the user") });

        if (!user) throw ApiError.BadRequest(400, "Email or password is incorrect");

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) throw ApiError.BadRequest(400, "Email or password is incorrect");

        let role: number;

        user.is_admin ? role = 286 : role = 333;
            
        const tokens = await tokenService.generateTokens({id: String(user.id), role});

        await TokenModel.update({ token: tokens.refreshToken}, {
            where: {
                user: user.id
            }
        }).catch(err => {throw ApiError.BadRequest(500, `Fatal error unable to update token in DB`)});

        return tokens; 
        
    }

    async refresh(cookie: string): Promise<ITokens> {
        const validToken = jwt.verify(cookie, REFRESHKEY) as ITokenData;

        if (!validToken) throw ApiError.Unauthorized();

        const tokenExists = await TokenModel.findOne({where: {token: cookie}});

        if (!tokenExists) throw ApiError.Unauthorized();        

        const user = await UserModel.findOne({where: {id: validToken.id}});

        if (!user) throw ApiError.BadRequest(500, "No such user exists");

        const tokens = await tokenService.generateTokens({id: user.id, role: validToken.role});

        const saveToken = await TokenModel.update({ token: tokens.refreshToken, user: user.id}, {
            where: { token: cookie }
        }).catch(err => {throw ApiError.BadRequest(500, `Fatal error unable to update the token in DB`)});

        if(!saveToken) throw ApiError.BadRequest(500, "Fatal error, unable to create the token");

        return tokens;
    }
}

export const userService = new UserService;