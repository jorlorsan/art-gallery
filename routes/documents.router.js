const jwt = require('jsonwebtoken')
const documentRouter = require('express').Router()

const { auth, isEmployee } = require('../utils/functions')

const {
    getAllDocuments, 
    createDocument,
    filterDocuments,
    deleteDocument,
    getDocument,
    updateDocument

} = require('../controllers/documents.controller')

documentRouter.get( '/', auth, isEmployee, getAllDocuments)
documentRouter.post( '/', auth, isEmployee, createDocument)
documentRouter.get( '/filter', auth, isEmployee, filterDocuments)
documentRouter.get('/:documentId', auth, isEmployee, getDocument)
documentRouter.delete('/:documentId', auth, isEmployee, deleteDocument)
documentRouter.put('/:documentId', auth, isEmployee, updateDocument
)


module.exports = documentRouter