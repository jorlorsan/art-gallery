const contactsModel = require('../models/contacts.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function signUp(req, res) {
  console.log("HOLA!!!!!!!!", req.body)
   const hashed_password = bcrypt.hashSync(req.body.password, 10)

    const hashed_body = {
      name: req.body.name,
      surname: req.body.surname,
      type: req.body.type,
      telephone: req.body.telephone,
      email: req.body.email,
      password: hashed_password
    }

    contactsModel.create(hashed_body)
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
      .catch((err) => {
        res.json(err)
      })
}

function logIn(req, res) {

  contactsModel.findOne({ email: req.body.email })
    .then((contact) => {
      if (!contact) res.json('Wrong email')

      bcrypt.compare(
        req.body.password, 
        contact.password, 
        (err, result) => {
          if (err) res.json('Wrong password')
          
          const insideToken = {
            name: contact.name,
            surname: contact.surname,
            email: contact.email,
            id: contact._id,
            type: contact.type
          }
          const token = jwt.sign(
            insideToken,
            process.env.SECRET,
          )

          resContact = {
            name: contact.name,
            surname: contact.surname,
            email: contact.email,
            id: contact._id,
            token: token
          }
          
          res.json(resContact)
        })

    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  signUp,
  logIn
}