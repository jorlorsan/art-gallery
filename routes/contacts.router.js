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

contactRouter.get( '/', auth, isAdmin, getAllContacts)
contactRouter.get('/filter', auth, isAdmin, filterContacts)
contactRouter.get('/:contactId', auth, isAdmin,getContact)
contactRouter.post( '/', auth, isAdmin, createContact)
contactRouter.delete('/:contactId', auth, isAdmin, deleteContact)
contactRouter.put('/:contactId', auth, updateContact) /*tendría que ser solo la tuya*/

module.exports = contactRouter
