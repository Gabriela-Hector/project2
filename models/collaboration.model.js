const mongoose = require("mongoose")
const Schema = mongoose.Schema

const collaborationSchema = new Schema({
    collaborationType: {
        type: String,
        enum: ['shopping', 'displacement', 'company', 'caring', 'technology', 'housework', 'DIY', 'other'],
        required: true,
    },
    audioDescription: String,
    telephoneNumber: {
        type: String,
        required: true,
    },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    helperId: { type: Schema.Types.ObjectId, ref: 'User' },
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [Number]
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'closed'],
        required: true,
        default: 'pending'
    }
}, {
    timestamps: true
})

const Collaboration = mongoose.model("Collaboration", collaborationSchema)

module.exports = Collaboration