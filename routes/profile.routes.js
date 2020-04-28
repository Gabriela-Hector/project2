const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")
const Collaboration = require("../models/collaboration.model")


router.get('/all-petitions', (req, res) => {
    Collaboration.find()
        .then((collaborations) => res.json(collaborations))
        .catch(err => console.log(err))
})


const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('index', { loginErrorMessage: 'Acceso restringido' })
router.get('/:username', checkLoggedIn, (req, res) => {
    console.log(req.user)
    res.render('auth/profile', req.user)
})



module.exports = router
