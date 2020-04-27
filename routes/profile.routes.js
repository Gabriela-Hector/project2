const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")

const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('index', { loginErrorMessage: 'Acceso restringido' })
router.get('/:username', checkLoggedIn, (req, res) => {
    console.log(req.user)
    res.render('auth/profile', req.user)
})

module.exports = router
