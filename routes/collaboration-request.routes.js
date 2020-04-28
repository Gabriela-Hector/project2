const express = require('express')
const router = express.Router()
const multer = require('multer')

const uploadLocal = multer({ dest: './public/uploads/' })

router.get('/', (req, res) => res.render('collaboration-request/request'))

router.post('/', (req, res, next) => {

    console.log('El archivo de audio es', req.body.audioDescription)

    console.log(req.body)
    res.redirect('/')
})

// router.get('/audiofile', (req, res, next) => {
//     console.log('Axios', req.query)
// })

module.exports = router