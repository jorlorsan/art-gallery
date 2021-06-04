const jwt = require('jsonwebtoken')
const exhibitionFairRouter = require('express').Router()

const { auth, isEmployee } = require('../utils/functions')

const { getAllExhibitionsFairs, 
        filterExhibitionsFairs,
        getExhibitionFairByTitle, 
        createAnExhibitionFair, 
        updateExhibitionFair 
    } = require('../controllers/exhibitionsFairs.controller')

exhibitionFairRouter.get( '/', auth, getAllExhibitionsFairs)
exhibitionFairRouter.get( '/filter/', auth, filterExhibitionsFairs)
exhibitionFairRouter.get( '/:title', auth, getExhibitionFairByTitle)
exhibitionFairRouter.post( '/', auth, isEmployee, createAnExhibitionFair)
exhibitionFairRouter.put( '/:exhibitionId', auth, isEmployee, updateExhibitionFair)



module.exports = exhibitionFairRouter