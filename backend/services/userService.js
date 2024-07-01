const User = require('../models/user');

const createUser = async(userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw error;
    }
};

const getUserById = async(userId) => {
    try {
        const user = await User.findByPk(userId);
        return user;
    } catch (error) {
        throw error;
    }
};

const updateUser = async(userId, updatedUser) => {
    try {
        await User.update(updatedUser, { where: { id: userId } });
        const updatedUser = await User.findByPk(userId);
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async(userId) => {
    try {
        await User.destroy({ where: { id: userId } });
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