const express = require("express")
const router = express.Router()

const Collaboration = require("../models/collaboration.model")
const User = require("../models/user.model")

const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/')

//Axios
router.get('/:id/place', (req, res, next) => {
    Collaboration.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.get('/:id/details', checkLoggedIn, (req, res, next) => {
    Collaboration.findById(req.params.id)
        .populate('creatorId')
        .then(foundCollaboration => res.render('profile/collab-details', foundCollaboration))
        .catch(err => next(new Error(err)))
})

router.get('/:id/accept', checkLoggedIn, (req, res, next) => {
    Collaboration.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true })
        .then(updatedCollaboration => User.findByIdAndUpdate(req.user._id, { $push: { 'acceptedCollaborations': updatedCollaboration._id } }, { new: true }))
        .then(user => res.redirect(`/${user.username}/profile`))
        .catch(err => next(new Error(err)))
})

router.get('/:id/complete', checkLoggedIn, (req, res, next) => {
    Collaboration.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true })
        .then(res.redirect(`/${req.user.username}/profile`))
        .catch(err => next(new Error(err)))
})

router.get('/:idCollaboration/close', checkLoggedIn, (req, res, next) => {
    Collaboration.findByIdAndUpdate(req.params.idCollaboration, { status: 'closed' }, { new: true })
        .populate('creatorId')
        .then(updatedCollaboration => res.redirect(`/${updatedCollaboration.creatorId.username}/profile`))
        .catch(err => next(new Error(err)))
})

module.exports = router