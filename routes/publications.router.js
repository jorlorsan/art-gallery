const jwt = require('jsonwebtoken')
const publicationRouter = require('express').Router()

const { auth, isEmployee } = require('../utils/functions')

const {
    getAllPublications, 
    createPublication,
    getPublication,
    deletePublication, 
    updatePublication


} = require('../controllers/publications.controller')

publicationRouter.get( '/', auth, getAllPublications)
publicationRouter.post( '/', auth, isEmployee, createPublication)
publicationRouter.get('/:publicationId', auth, getPublication)
publicationRouter.delete('/:publicationId', auth, isEmployee, deletePublication)
publicationRouter.put('/:publicationId', auth, isEmployee, updatePublication
)


module.exports = publicationRouter