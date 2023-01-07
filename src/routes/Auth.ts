import express from "express";
import controller from "../controllers/User";
import { config } from "../config/config";
import jwt from "jsonwebtoken";
import {jwtAuth} from "../library/Auth";

const router = express.Router();

router.post("/login", (req, res) => {
    const user = { id: req.body.id };
    const token = jwt.sign(user, config.auth.accessTokenSecret as string, { expiresIn: "1h" });
    res.cookie("token", token);
    res.status(200).json({ message: "logged in" });
})

router.delete("/logout", jwtAuth, (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "logged out" });
})

export = router;