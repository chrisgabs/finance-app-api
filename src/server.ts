import { config } from "./config/config";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import Logging from "./library/Logging";
import recordRoutes from "./routes/Record";

const router = express();

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
        Logging.info("Successfully connected to MongoDB.");
        StartServer();
    })
    .catch((err) => {
        Logging.error("Error connecting to MongoDB.");
        Logging.error(err);
    });

// TODO: Add Helm? Research different middleware options.
const StartServer = () => {
    /* Log all requests to console */
    router.use((req, res, next) => {
        Logging.info(`Incoming -> ${req.method} ${req.url} ${req.path}`);

        /* Log responses */
        res.on("finish", () => {
            Logging.info(`Outgoing -> ${req.method} ${req.url} ${req.path} ${res.statusCode}`);
        });
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /* Set API rules */
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }

        next();
    });

    /* Put routes here */
    router.use("/records", recordRoutes);

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
