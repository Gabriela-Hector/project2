const mongoose = require("mongoose")
const Schema = mongoose.Schema

const colaborationSchema = new Schema({
    colaborationType: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Colaboration = mongoose.model("Colaboration", colaborationSchema)

module.exports = Colaboration