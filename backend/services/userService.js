const User = require('../models/User');

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

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUsersByEmail,
    updateUser,
    deleteUser,
};