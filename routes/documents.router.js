const jwt = require('jsonwebtoken')
const documentRouter = require('express').Router()

const {
    getAllDocuments, 
    createDocument,
    filterDocuments,
    deleteDocument,
    getDocument,
    updateDocument

} = require('../controllers/documents.controller')

documentRouter.get( '/', getAllDocuments)
documentRouter.post( '/', createDocument)
documentRouter.get( '/filter', filterDocuments)
documentRouter.get('/:documentId', getDocument)
documentRouter.delete('/:documentId', deleteDocument)
documentRouter.put('/:documentId', updateDocument
)


module.exports = documentRouter