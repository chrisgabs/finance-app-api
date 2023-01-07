import { RequestHandler } from "express";
import { config } from "../config/config";
import jwt from "jsonwebtoken";

export const jwtAuth:RequestHandler = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, config.auth.accessTokenSecret as string);
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.status(401).json({ message: "Unauthorized" });
    }
};