import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Record from "../models/Record";

const createRecord = (req: Request, res: Response, next: NextFunction) => {
    // Session ID is undefined
    const record = new Record({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type,
        account: req.body.account,
        amount: req.body.amount,
        date: new Date(),
    });

    record
        .save()
        .then((result) => {
            res.status(201).json({
                message: "Record created",
                record: {
                    _id: result._id,
                    type: result.type,
                    account: result.account,
                    amount: result.amount,
                    date: result.date,
                },
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};

const getRecords = (req: Request, res: Response, next: NextFunction) => {
    Record.find({})
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};

const getRecord = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    Record.findById(id)
        .then((record) => (record ? res.status(200).json(record) : res.status(404).json({ message: "No valid entry found for provided ID" })))
        .catch((err) => res.status(500).json({ error: err }));
};

const deleteRecord = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    Record.findByIdAndDelete(id)
        .then((record) => (record ? res.status(200).json({ message: "Record deleted", deleted: true }) : res.status(404).json({ message: "No valid entry found for provided ID" })))
        .catch((err) => res.status(500).json({ error: err }));
};

export default { createRecord, getRecords, getRecord, deleteRecord };
