const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw error;
    }
};

const getAllUsers = async () => {
    const user = await User.find();
    return user;
}

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw error;
    }
};

const getUsersByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw error;
    }
};

const updateUser = async (userId, updatedData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: ture });
        return user;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        await User.findByIdAndDelete(userId);
    } catch (error) {
        throw error;
    }
};

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error ('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET
        );

        return { token, userId: user._id };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUsersByEmail,
    updateUser,
    deleteUser,
    loginUser,
};