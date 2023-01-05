import mongoose, { Document, Schema } from "mongoose";
import RecordSchema from "./Record";
import AccountSchema from "./Account";

export interface IUser extends Document {
    name: string;
    picture: string;
    accounts: Array<any>;
    records: Array<any>;
}

const UserSchema:Schema = new Schema(
    {
        name: { type: String, required: true },
        picture: { type: String, required: true },
        accounts: { type: [AccountSchema.schema], required: true },
        records: { type: [RecordSchema.schema], required: true }
    },
    { versionKey: false }
);

export default mongoose.model<IUser>("User", UserSchema);
