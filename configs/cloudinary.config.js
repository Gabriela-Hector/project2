const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})
var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Ya-va-recordings',
        allowedFormats: ['mp3'],
        format: 'mp3',
        resource_type: 'video'
    },
    filename: function (req, file, callback) {
        callback(null, file.originalName)
    }
})
const uploadCloud = multer({ storage: storage })
module.exports = uploadCloud