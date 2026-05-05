import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.text());

app.use(cookieParser());

// Désactive CORS (à ne pas faire en prod, ici uniquement pour pouvoir tester le projet)
app.use(cors());

export default app;
