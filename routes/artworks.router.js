const jwt = require('jsonwebtoken')
const artworkRouter = require('express').Router()

const { getAllArtworks, createArtwork } = require('../controllers/artworks.controller')

artworkRouter.get( '/', getAllArtworks)
artworkRouter.post( '/', auth, isAdmin, createArtwork)


function auth(req, res, next) {

   /* req.body
    req.query
    req.params
    req.headers // req.headers.token
  */

  jwt.verify(
    req.headers.token, 
    process.env.SECRET, 
    (err, insideToken) => {
      if (err) res.json('Token not valid')
      res.locals.id = insideToken.id
      res.locals.type = insideToken.type
      next()
  })
}

function isAdmin(req, res, next) {
  console.log(res.locals)
  if (res.locals.type === "Admin") { 
  next()
  } else res.json("No está autorizado")
}


module.exports = artworkRouter