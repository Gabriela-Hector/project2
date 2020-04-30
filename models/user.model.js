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
    telephoneNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'active'],
        default: 'active'
    },
    knowledge: {
        type: [String],
        enum: ['shopping', 'displacement', 'company', 'caring', 'technology', 'Housework', 'DIY']
    },
    description: String,
    profilePic: {
        type: String
    },
    collaborations: [{ type: Schema.Types.ObjectId, ref: 'Collaboration' }],
    acceptedCollaborations: [{ type: Schema.Types.ObjectId, ref: 'Collaboration' }],
    verificationToken: String,
    recuperationToken: String
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User