const express = require("express")
const router = express.Router()
const passport = require("passport")

const Collaboration = require("../models/collaboration.model")
const User = require("../models/user.model")

const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/')


//Axios
router.get('/findCollaborations', (req, res, next) => {
    const knowledgeList = req.query.knowledgeList.split(',')
    Collaboration.find({ $and: [{ collaborationType: { $in: knowledgeList } }, { status: 'pending' }, { creatorId: { $ne: req.user._id } }] })
        .then(foundCollaborations => {
            res.json(foundCollaborations)
        })
        .catch(err => next(new Error(err)))
})

//Encuentra collaboraciones que coincidan con tus conocimientos, esten pendientes y no seas el creador
router.get('/:username/help', checkLoggedIn, (req, res, next) => {
    Collaboration.find({ $and: [{ collaborationType: { $in: req.user.knowledge } }, { status: 'pending' }, { creatorId: { $ne: req.user._id } }] })
        .then(foundCollaborations => res.render('profile/help', { collaborations: foundCollaborations, user: req.user }))
        .catch(err => next(new Error(err)))
})

router.get('/:username/profile', checkLoggedIn, (req, res, next) => {
    console.log("el perfil es,", req.user)
    User.findById(req.user._id)
        .populate('collaborations')
        .populate('acceptedCollaborations')
        .then(foundUser => {
            res.render('profile/profile', { user: foundUser })
        })
        .catch(err => next(new Error(err)))
})
router.get('/:username', checkLoggedIn, (req, res) => res.render('profile/menu', { user: req.user }))



module.exports = router
