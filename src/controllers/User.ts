import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";

    // name: string;
    // picture: string;
    // accounts: Array<AccountSchema>;
    // records: Array<RecordSchema>;

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const record = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        picture: req.body.picture,
        accounts: [], // is this legal
        records: [],
    });

    record
        .save()
        .then((result) => {
            res.status(201).json({
                message: "Record created",
                createdRecord: {
                    _id: result._id,
                    name: result.name,
                    picture: result.picture,
                    accounts: result.accounts,
                    records: result.records,
                },
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find({})
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    User.findById(id)
        .then((user) => (user ? res.status(200).json(user) : res.status(404).json({ message: "No valid entry found for provided ID" })))
        .catch((err) => res.status(500).json({ error: err }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then((user) => (user ? res.status(200).json({ message: "User deleted", deleted: true }) : res.status(404).json({ message: "No valid entry found for provided ID" })))
        .catch((err) => res.status(500).json({ error: err }));
};

export default { createUser, getAllUsers, getUser, deleteUser };
