const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const createUser = async (req, res) => {
    try {
        const { username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userService.createUser({ username, email, password: hashedPassword});
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = userService.deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, userId } = await userService.loginUser(email, password);
        res.status(200).json({ token, userId });
        // const user = await userService.getUsersByEmail(email);
        // if(!user) {
        //     return res.status(404).json({ error: "User not found" });
        // }
        // const isMatch = await bcrypt.compare(password, user.password);
        // if(!isMatch) {
        //     return res.status(400).json({ error: "Invalid Credentials" })
        // }
        // const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
        // res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
}

