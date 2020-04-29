const express = require("express")
const router = express.Router()
const passport = require("passport")

const Collaboration = require("../models/collaboration.model")
const User = require("../models/user.model")


router.get('/detalles', (req, res) => res.render('profile/collab-details'))

//llamada de Axios
router.get('/findCollaborations', (req, res, next) => {
    const knowledgeList = req.query.knowledgeList.split(',')
    const query = []
    knowledgeList.forEach(elm => query.push({ collaborationType: elm }))

    Collaboration.find({ $or: query })
        .then(foundCollaborations => {
            res.json(foundCollaborations)
        })
        .catch(err => next(new Error(err)))
})

router.get('/:username/help', (req, res, next) => {

    const query = []
    req.user.knowledge.forEach(elm => query.push({ collaborationType: elm }))

    Collaboration.find({ $or: query })
        .then(foundCollaborations => res.render('profile/help', { collaborations: foundCollaborations, user: req.user }))
        .catch(err => next(new Error(err)))
})

router.get('/:username/profile', (req, res, next) => {
    User.findById(req.user._id)
        .populate('collaborations')
        .populate('acceptedCollaborations')
        .then(foundUser => {
            res.render('profile/profile', { user: foundUser })
        })
        .catch(err => next(new Error(err)))
})
router.get('/:username', (req, res) => req.isAuthenticated() ? res.render('profile/menu', { user: req.user }) : res.redirect('/'))

module.exports = router
