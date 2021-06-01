const jwt = require('jsonwebtoken')
const contactRouter = require('express').Router()
const { auth, isAdmin } = require('../utils/functions')

const { 
    getAllContacts, 
    createContact,
    filterContacts,
    deleteContact,
    getContact,
    updateContact
} = require('../controllers/contacts.controller')

contactRouter.get( '/', getAllContacts)
contactRouter.get('/:contactId',getContact)
contactRouter.post( '/', createContact)
contactRouter.get('/filter', filterContacts)
contactRouter.delete('/:contactId', auth, isAdmin, deleteContact)
contactRouter.put('/:contactId', auth, updateContact)

module.exports = contactRouter
