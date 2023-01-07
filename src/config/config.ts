import dotenv from "dotenv";

dotenv.config();

// ----- DB CONFIG ----- //

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_CLUSTER = process.env.MONGO_CLUSTER || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

// ----- AUTH CONFIG ----- //

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

// ----- EXPORT CONFIG ----- //

export const config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
    auth: {
        accessTokenSecret: ACCESS_TOKEN_SECRET
    }  
};