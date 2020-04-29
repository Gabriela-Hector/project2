const express = require('express')
const router = express.Router()
const multer = require('multer')

const ffmpeg = require('ffmpeg')
const uploadLocal = multer({ dest: './public/uploads/' })

const User = require("../models/user.model")
const Collaboration = require("../models/collaboration.model")

router.get('/', (req, res) => res.render('collaboration.request/request'))

//CREATE COLLABORATION
router.post('/', (req, res, next) => {
    const { collaborationType, lat, lng, telephoneNumber } = req.body
    Collaboration.create({ collaborationType, location: { coordinates: [lat, lng] }, telephoneNumber, creatorId: req.user._id })
        .then(newCollaboration => {
            User.findByIdAndUpdate(newCollaboration.creatorId, { $push: { 'collaborations': newCollaboration } })
                .then(res.redirect('/'))
                .catch(err => next(new Error(err)))
        })
        .catch(err => next(new Error(err)))
})

router.get('/:idCollaboration/close', (req, res, next) => {
    Collaboration.findByIdAndUpdate(req.params.idCollaboration, { status: 'closed' }, { new: true })
        .populate('creatorId')
        .then(updatedCollaboration => res.redirect(`/${updatedCollaboration.creatorId.username}/profile`))
        .catch(err => next(new Error(err)))
})

// router.get('/audiofile', (req, res, next) => {
//     console.log('Axios', req.query)
//     try {
//         console.log('antes');
//         let process = new ffmpeg(req.query.blob)
//         console.log('despues');
//         process.then(audio => {
//             audio.fnExtracrSoundToMP·('./public/audio/audio.mp3', (error, file) => {
//                 if (!error) {
//                     console.log(`Audio file: ${file}`)
//                 }
//             }, err => {
//                 console.log(`Error: ${err}`)
//             })
//         })
//     }
//     catch (e) {
//         console.log(e.code)
//         console.log(e.msg)
//     }
// })

module.exports = router