const express = require("express")
const router = express.Router()
const passport = require("passport")
const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('index', { loginErrorMessage: 'Acceso restringido' })

const User = require("../models/user.model")
const Collaboration = require("../models/collaboration.model")

router.get('/detalles', (req, res) => res.render('profile/collab-details'))

router.get('/all-petitions', (req, res) => {
    Collaboration.find()
        .then((collaborations) => res.json(collaborations))
        .catch(err => console.log(err))
})


router.get('/:username', checkLoggedIn, (req, res) => {
    Collaboration.find()
        .then(allCollaborations => res.render('profile/profile', { user: req.user, collaborations: allCollaborations }))
        .catch(err => console.log('Error', err))
})

module.exports = router
