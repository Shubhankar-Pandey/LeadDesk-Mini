import { signinBody, signupBody } from "../zodSchema/zodSchemas.js";
import Prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
    try {
        const result = signupBody.safeParse(req.body);
        if (!result.success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            });
        }
        const { name, email, password } = result.data;
        const existUser = await Prisma.admin.findUnique({
            where: {
                email
            }
        });
        if (existUser) {
            return res.status(401).json({
                success: false,
                message: "User already exist",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await Prisma.admin.create({
            data: {
                name, email, password: hashedPassword,
            }
        });
        return res.status(200).json({
            success: true,
            message: "Admin registered successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
export const signin = async (req, res) => {
    try {
        const result = signinBody.safeParse(req.body);
        if (!result.success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            });
        }
        const { email, password } = result.data;
        const existUser = await Prisma.admin.findUnique({
            where: {
                email,
            }
        });
        if (!existUser) {
            return res.status(403).json({
                success: false,
                message: "User not registered",
            });
        }
        const flag = await bcrypt.compare(password, existUser.password);
        if (!flag) {
            return res.status(403).json({
                success: false,
                message: "Wrong password",
            });
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET not found");
        }
        const payload = {
            email: existUser.email,
            userId: existUser.id,
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", // 'as const' needed so TS infers the literal type, not string
            maxAge: 2 * 60 * 60 * 1000,
        };
        return res.cookie("token", token, cookieOptions).status(200).json({
            success: true,
            message: "Sign in successfull",
            name: existUser.name,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
export const signout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return res.status(200).json({
            success: true,
            message: "Signed out successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
//# sourceMappingURL=auth.js.map