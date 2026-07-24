import dotenv from "dotenv";
dotenv.config();
import express, { type Request, type Response } from "express"
import router from "./routes/routes.js";
import cors from "cors"
import cookieparser from "cookie-parser";
const app = express();


app.use(express.json());
app.use(cookieparser());

const allowedOrigin = process.env.FRONTEND_URL?.replace(/\/$/, '');
app.use(cors({
        origin: allowedOrigin,
        credentials: true,
    }
));

app.use(router);

declare global {
  namespace Express {
    interface Request {
      user?: number;
    }
  }
}


app.get("/", (req : Request, res : Response) => {
    return res.json({
		success:true,
		message:'Your server is up and running....'
	});
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started at PORT number ${PORT}`);
})