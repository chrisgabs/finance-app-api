import mongoose, { Document, Schema } from "mongoose";

export interface IRecord extends Document {
    type: string;
    account: string;
    amount: number;
    date: Date;
}

const RecordSchema = new Schema(
    {
        type: { type: String, required: true },
        account: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
    },
    { versionKey: false }
);

export default mongoose.model<IRecord>("Record", RecordSchema);
