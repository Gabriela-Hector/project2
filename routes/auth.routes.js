const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10

// User signup
router.get("/signup", (req, res) => res.render("auth/signup"))
router.post("/signup", (req, res, next) => {

    const { username, email, password, telephoneNumber, knowledge } = req.body

    if (!username || !password || !email) {
        res.render("auth/signup", { errorMsg: "Rellena todos los campos" })
        return
    }

    User.findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/signup", { errorMsg: "El usuario ya está registrado" })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({ username, email, password: hashPass, telephoneNumber, knowledge })
                .then(() => res.redirect("/login"))
                .catch((err) => res.render("auth/signup", { errorMsg: "No se pudo crear el usuario" }))
        })
        .catch(error => next(error))
})


// User login
router.get('/login', (req, res) => res.render('auth/login', { "errorMsg": req.flash("error") }))
router.post('/login', passport.authenticate("local", {
    successRedirect: "/checkLogin",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true,
    badRequestMessage: 'Rellena todos los campos'
}))

router.get('/checkLogin', (req, res) => req.isAuthenticated() ? res.redirect(`/${req.user.username}`) : res.redirect('/login'))

// User logout
router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
})

module.exports = router