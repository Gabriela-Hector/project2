const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'active'],
        default: 'pending'
    },
    knowledge: {
        type: [String],
        enum: ['shopping', 'displacement', 'company', 'caring', 'technology', 'Housework', 'DIY']
    },
    description: String,
    profilePic: {
        type: String
    },
    verificationToken: String,
    recuperationToken: String
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User