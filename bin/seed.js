const mongoose = require('mongoose')
const User = require('../models/user.model')
const Collaboration = require('../models/collaboration.model')
const bcrypt = require('bcrypt')
const bcryptSalt = 10
const salt = bcrypt.genSaltSync(bcryptSalt)

mongoose.connect(`mongodb://localhost/${process.env.DB}`, { useUnifiedTopology: true, useNewUrlParser: true })

User.collection.drop()
Collaboration.collection.drop()

const users = [
    {
        username: 'Gabriela',
        email: 'gaaaaabrielagallango@gmail.com',
        password: bcrypt.hashSync('gaby', salt),
        status: 'active',
        knowledge: ['company', 'DIY'],
        verificationToken: '',
        recuperationToken: ''
    },
    {
        username: 'Hector',
        email: 'hectoranf@gmail.com',
        password: bcrypt.hashSync('1234', salt),
        status: 'active',
        knowledge: ['shopping', 'displacement', 'caring', 'technology', 'Housework', 'DIY'],
        verificationToken: '',
        recuperationToken: ''
    },
    {
        username: 'Paco',
        email: 'hectoranf@gmail.com',
        password: bcrypt.hashSync('paco', salt),
        status: 'active',
        knowledge: ['displacement', 'caring', 'technology', 'DIY'],
        verificationToken: '',
        recuperationToken: ''
    }]

User.create(users)
    .then(seededUsers => console.log('Se han creado:', seededUsers))
    .catch(err => console.log('An error ocurred', err))

const collaborations = [
    {
        collaborationType: 'shopping',
        description: '',
        telephoneNumber: '666666666',
        location: {
            type: "Point",
            coordinates: [41.566230, -2.1749801]
        },
        status: 'pending'
    },
    {
        collaborationType: 'DIY',
        description: '',
        telephoneNumber: '666666666',
        location: {
            type: "Point",
            coordinates: [40.4187662, -3.7017146]
        },
        status: 'pending'
    },
    {
        collaborationType: 'shopping',
        description: '',
        telephoneNumber: '666666666',
        location: {
            type: "Point",
            coordinates: [40.418814, -3.7018057]
        },
        status: 'pending'
    },
    {
        collaborationType: 'caring',
        description: '',
        telephoneNumber: '666666666',
        location: {
            type: "Point",
            coordinates: [40.4189027, -3.7001931]
        },
        status: 'pending'
    },
    {
        collaborationType: 'company',
        description: '',
        telephoneNumber: '666666666',
        location: {
            type: "Point",
            coordinates: [40.4191555, -3.7023236]
        },
        status: 'pending'
    },
    {
        collaborationType: 'other',
        description: '',
        telephoneNumber: '666666666',
        location: {
            type: "Point",
            coordinates: [40.4191555, -3.7023236]
        },
        status: 'pending'
    },
    {
        collaborationType: 'technology',
        description: '',
        telephoneNumber: '666666666',
        location: {
            type: "Point",
            coordinates: [40.418814, -3.7018057]
        },
        status: 'pending'
    },
    {
        collaborationType: 'caring',
        description: '',
        telephoneNumber: '666666666',
        location: {
            type: "Point",
            coordinates: [40.418814, -3.7018057]
        },
        status: 'pending'
    }]

Collaboration.create(collaborations)
    .then(seededCollaborations => {
        console.log('Se han creado las siguientes peticiones:', seededCollaborations)
        mongoose.connection.close()
    })
    .catch(err => console.log('An error ocurred', err))
