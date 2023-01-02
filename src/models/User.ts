import mongoose, { Document, Schema } from "mongoose";
import {RecordSchema} from "./Record";
import {AccountSchema} from "./Account";

export interface UserSchema extends Document {
    name: string;
    picture: string;
    accounts: Array<AccountSchema>;
    records: Array<RecordSchema>;
}

const RecordSchema = new Schema(
    {
        name: { type: String, required: true },
        picture: { type: String, required: true },
        accounts: { type: Array, required: true },
        records: { type: Array, required: true }
    },
    { versionKey: false }
);

export default mongoose.model<UserSchema>("User", RecordSchema);
