import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import db from './instances/sequelize';
import router from './routes/index';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

const PORT = process.env.PORT || "9001";

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandler);

app.listen(PORT, async() => {
    console.log(`App is running on port ${PORT}`);

    try {
        await db.authenticate();
        await db.sync({force: false});

        console.log("Successfully connected to the DB");
    } catch(err) {
        console.log(`Error while trying to connect to DB\nError: ${err}`)
    }
});