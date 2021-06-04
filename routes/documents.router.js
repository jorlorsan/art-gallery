const jwt = require('jsonwebtoken')
const documentRouter = require('express').Router()

const { auth, isAdmin } = require('../utils/functions')

const {
    getAllDocuments, 
    createDocument,
    filterDocuments,
    deleteDocument,
    getDocument,
    updateDocument

} = require('../controllers/documents.controller')

documentRouter.get( '/', auth, isAdmin, getAllDocuments)
documentRouter.post( '/', auth, isAdmin, createDocument)
documentRouter.get( '/filter', auth, isAdmin, filterDocuments)
documentRouter.get('/:documentId', auth, isAdmin, getDocument)
documentRouter.delete('/:documentId', auth, isAdmin, deleteDocument)
documentRouter.put('/:documentId', auth, isAdmin, updateDocument
)


module.exports = documentRouter