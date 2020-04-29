const express = require('express')
const router = express.Router()
const multer = require('multer')

const ffmpeg = require('ffmpeg')
const uploadLocal = multer({ dest: './public/uploads/' })

const Collaboration = require("../models/collaboration.model")


router.get('/', (req, res) => res.render('collaboration.request/request'))

//CREATE COLLABORATION
router.post('/', (req, res, next) => {
    const { collaborationType, lat, lng, telephoneNumber } = req.body
    Collaboration.create({ collaborationType, location: { coordinates: [lat, lng] }, telephoneNumber, creatorId: req.user._id })
        .then(res.redirect('/'))
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