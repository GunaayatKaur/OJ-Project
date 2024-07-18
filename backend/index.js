import express from 'express';
import cors from 'cors';
import DBConnection from './database/db.js';
const app = express();
import dotenv from 'dotenv';
import router from './routes/route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

//middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/', router)
DBConnection();

app.listen(8000 , () => {
    console.log('Example app listens at http://localhost:8000')
})