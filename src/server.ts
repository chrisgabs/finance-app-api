import { config } from "./config/config";
import express, { application } from "express";
import http from "http";
import mongoose from "mongoose";
import Logging from "./library/Logging";
import recordRoutes from "./routes/Record";
import userRoutes from "./routes/User";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import { RequestHandler } from "express";

// put this in a different file (types.d.ts)
declare module "express-serve-static-core" {
    interface Request {
        user: jwt.JwtPayload | string
    }
}

// declare module "express-session" {
//     interface SessionData {
//         user_id: string
//     }
// }

const router = express();

// mongoose
//     .connect(config.mongo.url, { retryWrites: true, w: "majority" })
//     .then(() => {
//         Logging.info("Successfully connected to MongoDB.");
//         StartServer();
//     })
//     .catch((err) => {
//         Logging.error("Error connecting to MongoDB.");
//         Logging.error(err);
//     });


const jwtAuth:RequestHandler = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, "adsadad");
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.redirect("/");
    }
};

// TODO: Add Helm? Research different middleware options.
const StartServer = () => {
    /* Log all requests to console */
    router.use((req, res, next) => {
        Logging.info(`Incoming -> METHOD-[${req.method}] URL-[${req.url}] PATH-[${req.path}]`);
        /* Log responses */
        res.on("finish", () => {
            Logging.info(`Outgoing -> ${req.method} ${req.url} ${req.path} ${res.statusCode}`);
        });
        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /* Set API rules */
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:5173");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, withCredentials, credentials");
        res.header("Access-Control-Allow-Credentials", "true");

        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }

        next();
    });

    /* Set up JWT */
    router.use(sessions({ secret: "superSecretString", resave: false, saveUninitialized: false }));
    router.use(cookieParser());

    /* Check if user logged in */

    // router.use((req, res, next) => {
    //     session = req.session;
    //     console.log(req.session)
    //     if (session.id) {
    //         console.log("logged in")
    //     }else {
    //         console.log("not logged in")
    //     }
    //     next();
    // });

    /* Put routes here */
    router.post("/login", (req, res) => {
        const user = { id: req.body.id };
        const token = jwt.sign(user, config.auth.accessTokenSecret as string, { expiresIn: "1h" });
        res.cookie("token", token);
        console.log(token)
        res.status(200).json({ message: "logged in" });
    })

    router.delete("/logout", (req, res) => {
        req.session.destroy(() => res.status(200).json({ message: "logged out" }));
    })

    router.use("/records", recordRoutes);
    router.use("/users", userRoutes);

    /* Health Check */
    router.get("/ping", (req, res) => res.status(200).json({ message: "poggers" }));

    /* Error 404 */
    router.use((req, res, next) => {
        const error = new Error("Not found");
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`Server started on port ${config.server.port}`);
    });
};


StartServer();
