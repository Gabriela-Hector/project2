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
    helperId: Schema.Types.ObjectId,
    location: {
        type: { type: String },
        coordinates: [Number]
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
placesSchema.index({ location: '2dsphere' });

const Collaboration = mongoose.model("Collaboration", collaborationSchema)

module.exports = Collaboration