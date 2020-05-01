const express = require('express')
const router = express.Router()

router.get('/', (req, res) => req.isAuthenticated() ? res.redirect(`/${req.user.username}`) : res.render('index'))
router.get('/', (req, res) => res.redirect('/'))

module.exports = router