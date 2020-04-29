const express = require('express')
const router = express.Router()


router.get('/', (req, res) => req.isAuthenticated() ? res.redirect(`/${req.user.username}`) : res.render('index'))


module.exports = router