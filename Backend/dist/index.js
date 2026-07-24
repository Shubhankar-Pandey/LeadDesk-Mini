import dotenv from "dotenv";
dotenv.config();
import express, {} from "express";
import router from "./routes/routes.js";
import cors from "cors";
import cookieparser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(router);
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running....'
    });
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started at PORT number ${PORT}`);
});
//# sourceMappingURL=index.js.map