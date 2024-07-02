const User = require('../models/User');

const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw error;
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
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

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};