const express = require("express")
const router = express.Router()
const passport = require("passport")
const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('index', { loginErrorMessage: 'Acceso restringido' })

const User = require("../models/user.model")
const Collaboration = require("../models/collaboration.model")


router.get('/:id/place', (req, res, next) => {
    Collaboration.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})


router.get('/detalles/:id', checkLoggedIn, (req, res, next) => {
    Collaboration.findById(req.params.id)
        .then(collabDet => res.render('profile/collab-details', collabDet))
        .catch(err => next(new Error(err)))
})


router.get('/findCollaborations', (req, res, next) => {
    const knowledgeList = req.query.knowledgeList.split(',')
    const query = []
    knowledgeList.forEach(elm => query.push({ collaborationType: elm }))
    Collaboration.find({ $or: query })
        .then(collaborations => res.json(collaborations))
        .catch(err => next(new Error(err)))
})

router.get('/:username', checkLoggedIn, (req, res) => res.render('profile/menu', { user: req.user }))

router.get('/:username/help', checkLoggedIn, (req, res, next) => {
    Collaboration.find()
        .then(foundCollaborations => res.render('profile/help', { collaborations: foundCollaborations, user: req.user }))
        .catch(err => next(new Error(err)))
})

router.get('/:username/profile', checkLoggedIn, (req, res, next) => {
    res.render('profile/profile', { user: req.user })
})



module.exports = router
