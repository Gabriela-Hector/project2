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
    console.log('HOLA FRAN QUE HACESSSSSS')
    Collaboration.find({ $and: [{ collaborationType: { $in: req.user.knowledge } }, { status: 'pending' }, { creatorId: { $ne: req.user._id } }] })
        .populate('creatorId')
        .then(foundCollaborations => res.render('profile/help', { collaborations: foundCollaborations, user: req.user }))
        .catch(err => console.log(err))
})

router.get('/:username/profile', checkLoggedIn, (req, res, next) => {
    console.log("el perfil es,", req.user)
    User.findById(req.user._id)
        .populate('collaborations')
        .populate('acceptedCollaborations')
        .then(foundUser => {
            const collabs = foundUser.collaborations.filter(elm => elm.status != 'closed')
            console.log(collabs)
            const acceptedCollabs = foundUser.acceptedCollaborations.filter(elm => elm.status === 'accepted')
            res.render('profile/profile', { user: foundUser, collaborationsList: collabs, acceptedCollaborationsList: acceptedCollabs })
        })
        .catch(err => next(new Error(err)))
})


router.get('/:username', checkLoggedIn, (req, res) => res.render('profile/menu', { user: req.user }))

router.get('/:username/record', checkLoggedIn, (req, res, next) => {
    User.findById(req.user._id)
        .populate('collaborations')
        .then(user => {
            const completedCollabs = user.acceptedCollaborations.filter(elm => (elm.status === 'completed' || elm.status === 'closed'))
            return res.render('collaboration.request/collab-record', { user, completedCollabs })
        })
        .catch(err => next(new Error(err)))
})

router.get('/:username/completed', checkLoggedIn, (req, res, next) => {
    User.findById(req.user._id)
        .populate('acceptedCollaborations')
        .then(user => {
            const closedCollaborations = user.collaborations.filter(elm => elm.status === 'closed')
            res.render('collaboration.request/petitions', { user, closedCollaborations })
        })
        .catch(err => next(new Error(err)))
})

module.exports = router
