const jwt = require('jsonwebtoken')
const publicationRouter = require('express').Router()

const {
    getAllPublications, 
    createPublication,
    filterPublications,
    getPublication,
    deletePublication, 
    updatePublication


} = require('../controllers/publications.controller')

publicationRouter.get( '/', getAllPublications)
publicationRouter.post( '/', createPublication)
publicationRouter.get( '/filter', filterPublications)
publicationRouter.get('/:publicationId', getPublication)
publicationRouter.delete('/:publicationId', deletePublication)
publicationRouter.put('/:publicationId', updatePublication
)


module.exports = publicationRouter