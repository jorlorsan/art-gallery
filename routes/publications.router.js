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

publicationRouter.get( '/', getAllPublications)
publicationRouter.post( '/', auth, isEmployee, createPublication)
publicationRouter.get('/:publicationId', getPublication)
publicationRouter.delete('/:publicationId', auth, isEmployee, deletePublication)
publicationRouter.put('/:publicationId', auth, isEmployee, updatePublication
)


module.exports = publicationRouter