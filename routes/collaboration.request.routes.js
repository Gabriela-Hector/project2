const express = require('express')
const router = express.Router()
const cloudinaryAudio = require('../configs/cloudinary.config')

const User = require("../models/user.model")
const Collaboration = require("../models/collaboration.model")

router.get('/', (req, res) => res.render('collaboration.request/request'))

//CREATE COLLABORATION
router.post('/', (req, res, next) => {
    const { collaborationType, lat, lng, telephoneNumber, audioDescription } = req.body
    Collaboration.create({ collaborationType, audioDescription, location: { coordinates: [lat, lng] }, telephoneNumber, creatorId: req.user._id })
        .then(newCollaboration => User.findByIdAndUpdate(newCollaboration.creatorId, { $push: { 'collaborations': newCollaboration._id } }))
        .then(res.redirect('/'))
        .catch(err => next(new Error(err)))
})

router.post('/uploadAudio', cloudinaryAudio.single('audioRequest', { resource_type: 'raw' }), (req, res) => res.json(req.file.url))

module.exports = router