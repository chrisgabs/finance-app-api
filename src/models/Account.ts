import mongoose, { Document, Schema } from "mongoose";

export interface AccountSchema extends Document {
    name: string;
    type: string;
    amount: number;
    color: string;
}

const RecordSchema = new Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        amount: { type: Number, required: true },
        color: { type: String, required: true },
    },
    { versionKey: false }
);

export default mongoose.model<AccountSchema>("User", RecordSchema);
