const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: STRING,
        required: true,
    },
    email: {
        type: STRING,
        unique: true,
        required: true,
    },
    password: {
        type: STRING,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);