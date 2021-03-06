const contactsModel = require('../models/contacts.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { handleError} = require('../utils/functions');

function getAllContacts(req, res) {
  contactsModel
  .find()
  .populate('exhibitionsVisited', 'title' )
  .populate('artworkAcquired')
  .populate('relatedContacts', 'name')
  .then((contacts) => {
      res.json(contacts)
    })
  .catch((err) => handdleError(err, res))
}

function createContact(req, res){
  const hashed_password = bcrypt.hashSync(req.body.password, 10)

  const hashed_body = {
    name: req.body.name,
    surname: req.body.surname,
    type: req.body.type,
    telephone: req.body.telephone,
    email: req.body.email,
    password: hashed_password
  }

  contactsModel
    .create(hashed_body)
    .then((contact) => {

      const insideToken = {
        name: contact.name,
        surname: contact.surname,
        id: contact._id,
        type: contact.type
      }

      const token = jwt.sign(
        insideToken,
        process.env.SECRET
      )

      const resContact = {
        id: contact._id,
        name: contact.name,
        surname: contact.surname,
        email: contact.email,
        token: token
      }
      res.json(resContact)
    })
    .catch((err) => { res.json(err) })
}

function filterContacts(req, res){
<<<<<<< HEAD
  let queries = []
  if (req.query.name) queries.push({ name : {'$regex': req.query.name, '$options' : 'i' }})
  if (req.query.type) queries.push({ type: {'$regex': req.query.type, '$options' : 'i' }})
    contactsModel
      .find({ $or: queries })
      .populate('exhibitionsVisited', 'title' )
      .populate('artworkAcquired')
      .populate('relatedContacts', 'name')
      .populate('relatedContacts', 'surname')
      .then((contacts) => { 
				res.json(contacts);
			})
      .catch((err) => res.json(err))
=======
  let queryArray=[]
  if(req.query.name) queryArray.push({ name : {'$regex': req.query.name, '$options' : 'i' } })
  if(req.query.type) queryArray.push({ type : {'$regex': req.query.type, '$options' : 'i' }})
  contactsModel
    .find({ $or: queryArra})
    .populate('exhibitionsVisited', 'title' )
    .populate('artworkAcquired')
    .populate('relatedContacts', 'name')
    .populate('relatedContacts', 'surname')
    .then((contacts) => { 
      res.json(contacts);
    })
    .catch((err) => res.json(err))
>>>>>>> a355335dd9c57bb6cfe56f4da980f69f0637ebc2
  }

function getContact(req, res) {
	contactId = req.params.contactId;
  console.log(contactId)
	contactsModel
		.findById(contactId)
    .populate('exhibitionsVisited', 'title' )
    .populate('artworkAcquired')
    .populate('relatedContacts', 'name')
    .populate('relatedContacts', 'surname')
		.then((contact) => {
			res.json(contact)
		})
		.catch((err) => res.json(err))
}


function deleteContact(req, res){
	contactsModel
		.deleteOne({"_id": req.params.contactId })
		.then((contactId) => {
			res.json(contactId);
		})
		.catch((err) => handdleError(err, res))
}

function updateContact(req, res) {
  console.log(req.params)
  contactsModel
	  .findByIdAndUpdate(req.params.contactId, req.body, {
      new: true,
    })
    .populate('exhibitionsVisited', 'title' )
    .populate('artworkAcquired')
    .populate('relatedContacts', 'name')
    .populate('relatedContacts', 'surname')
    .then(contact => res.json(contact))
    .catch((err) => handdleError(err, res))
}

module.exports = { 
    getAllContacts, 
    createContact,
		filterContacts,
		deleteContact,
		getContact,
		updateContact

}