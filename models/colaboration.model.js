const mongoose = require("mongoose")
const Schema = mongoose.Schema

const collaborationSchema = new Schema({
    colaborationType: {
        type: String,
        enum: ['shopping', 'displacement', 'company', 'caring', 'technology', 'Housework', 'DIY', 'other'],
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    telephoneNumber: {
        type: String,
        required: true,
    },
    helperId: Schema.Types.ObjectId,
    coordinates: {
        type: [Number],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accept', 'completed'],
        required: true,
        default: 'pending'
    }
}, {
    timestamps: true
})

const Collaboration = mongoose.model("Collboration", collaborationSchema)

module.exports = Collaboration