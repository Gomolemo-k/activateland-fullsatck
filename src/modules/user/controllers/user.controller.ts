import { Request, Response } from "npm:express@4.18.2";
import { User, validate } from "../models/user.model.ts";

const userNotFoundMessage = "User not found in database.";
const userAlreadyExistMessage = "User with given email already exist.";
const iternalServerErrorMessage = "Internal Server Error.";
const userCreatedMessage = "User created successfully.";

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        res.status(500).send({ message: iternalServerErrorMessage });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: userNotFoundMessage });
        return res.json(user);
    } catch (error) {
        res.status(500).send({ message: iternalServerErrorMessage });
    }
  };

export const createUser = async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        
        //User exist in database. 
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(409).send({ message: userAlreadyExistMessage });
        
        //Save new user.
        await new User({ ...req.body }).save();
        res.status(201).send({ message: userCreatedMessage });
    } catch (error) {
        res.status(500).send({ message: iternalServerErrorMessage });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!user) return res.status(404).json({ message: userNotFoundMessage });
        return res.json(user);
    } catch (error) {
        res.status(500).send({ message: iternalServerErrorMessage });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: userNotFoundMessage });
        return res.json(user);
    } catch (error) {
        res.status(500).send({ message: iternalServerErrorMessage });
    }
};