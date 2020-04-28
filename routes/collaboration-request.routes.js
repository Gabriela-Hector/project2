const express = require('express')
const router = express.Router()
const multer = require('multer')

const uploadLocal = multer({ dest: './public/uploads/' })

router.get('/', (req, res) => res.render('collaboration-request/request'))

router.post('/', uploadLocal.single('audioDescription'), (req, res, next) => {

    console.log('El archivo de audio es', req.file)

    console.log(req.body)
    res.redirect('/')
})

module.exports = router