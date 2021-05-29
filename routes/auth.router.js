const jwt = require('jsonwebtoken')
const authRouter = require('express').Router()

const {
    signUp,
    logIn
} = require('../controllers/auth.controller')

authRouter.post('/signUp', signUp)
authRouter.get('/logIn', logIn)

module.exports = authRouter