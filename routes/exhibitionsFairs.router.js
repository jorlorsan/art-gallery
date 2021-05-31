const jwt = require('jsonwebtoken')
const exhibitionFairRouter = require('express').Router()

const { getAllExhibitionsFairs, 
        filterExhibitionsFairs,
        getExhibitionFairByTitle, 
        createAnExhibitionFair, 
        updateExhibitionFair 
    } = require('../controllers/exhibitionsFairs.controller')

exhibitionFairRouter.get( '/', getAllExhibitionsFairs)
exhibitionFairRouter.get( '/filter/', filterExhibitionsFairs)
exhibitionFairRouter.get( '/:title', getExhibitionFairByTitle)
exhibitionFairRouter.post( '/', createAnExhibitionFair)
exhibitionFairRouter.put( '/:exhibitionId', updateExhibitionFair)


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


module.exports = exhibitionFairRouter