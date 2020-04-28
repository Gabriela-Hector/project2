const express = require("express")
const router = express.Router()
const passport = require("passport")
const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('index', { loginErrorMessage: 'Acceso restringido' })

const User = require("../models/user.model")
const Collaboration = require("../models/collaboration.model")

router.get('/detalles', (req, res) => res.render('profile/collab-details'))


router.get('/findCollaborations', (req, res, next) => {
    const knowledgeList = req.query.knowledgeList.split(',')
    const query = []
    knowledgeList.forEach(elm => query.push({ collaborationType: elm }))
    Collaboration.find({ $or: query })
        .then((collaborations) => res.json(collaborations))
        .catch(err => next(new Error(err)))
})


router.get('/:username', checkLoggedIn, (req, res, next) => {
    Collaboration.find()
        .then(allCollaborations => res.render('profile/profile', { user: req.user, collaborations: allCollaborations }))
        .catch(err => next(new Error(err)))
})

module.exports = router
