import express, {Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import db from './instances/sequelize';
import { UserModel } from './models/user';

dotenv.config();

const app = express();

const PORT = process.env.PORT || "9001";

app.use(express.json());

app.get("/lol", async(req: Request, res: Response, NextFunction) => {
    try {
        const newUser = await UserModel.create({
            name: 'lol',
            email: 'John@gmail.com',
            password: 'securepass',
        });
        console.log(newUser);
    } catch(err) {
        console.log(err);
    }
})

app.listen(PORT, async() => {
    console.log(`App is running on port ${PORT}`);

    try {
        await db.authenticate();
        
        console.log("Successfully connected to the DB");
    } catch(err) {
        console.log(`Error while trying to connect to DB\nError: ${err}`)
    }
});