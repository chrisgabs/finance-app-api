import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import Account from "../models/Account";

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        picture: req.body.picture,
        accounts: [new Account({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.accounts[0].name,
            type: req.body.accounts[0].type,
            amount: req.body.accounts[0].amount,
            color: req.body.accounts[0].color,
        })], // is this legal
        records: [],
    });

    user
        .save()
        .then((result) => {
            res.status(201).json({
                message: "User created",
                user: {
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
