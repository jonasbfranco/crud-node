import bcrypt from "bcrypt";
import { userValidation } from "../validations/user.validation";
import { createUser, getAll, getById } from "../repositorys/user.repository";

export const create = async (req, res) => {
    try {
        await userValidation.validate(req.body);

        const hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword;
        const user = await createUser(req.body);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};


export const get = async (req, res) => {
    try {
        const users = await getAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
};


export const getId = async (req, res) => {
    try {
        const user = await getById(Number(req.params.id));
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

