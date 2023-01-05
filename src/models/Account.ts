import mongoose, { Document, Schema } from "mongoose";

export interface IAccount extends Document {
    name: string;
    type: string;
    amount: number;
    color: string;
}

const AccountSchema:Schema = new Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        amount: { type: Number, required: true },
        color: { type: String, required: true },
    },
    { versionKey: false }
);

export default mongoose.model<IAccount>("Account", AccountSchema);
