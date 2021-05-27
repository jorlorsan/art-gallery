const jwt = require('jsonwebtoken')
const artworkRouter = require('express').Router()

const { getAllArtworks, createArtwork } = require('../controllers/artworks.controller')

artworkRouter.get( '/', getAllArtworks)
artworkRouter.post( '/', createArtwork)

/*
function auth(req, res, next) {

    req.body
    req.query
    req.params
    req.headers // req.headers.token
  

  jwt.verify(
    req.headers.token, 
    process.env.SECRET, 
    (err, insideToken) => {
      if (err) res.json('Token not valid')
      res.locals.id = insideToken.id
      next()
  })
}
*/

module.exports = artworkRouter