const jwt = require('jsonwebtoken')
const exhibitionFairRouter = require('express').Router()

const { auth, isEmployee } = require('../utils/functions')

const { getAllExhibitionsFairs, 
        filterExhibitionsFairs,
        getExhibitionFairById, 
        createAnExhibitionFair, 
        updateExhibitionFair 
    } = require('../controllers/exhibitionsFairs.controller')

exhibitionFairRouter.get( '/', getAllExhibitionsFairs)
exhibitionFairRouter.get( '/filter/', filterExhibitionsFairs)
exhibitionFairRouter.get( '/:exhibitionId', getExhibitionFairById)
exhibitionFairRouter.post( '/', auth, isEmployee, createAnExhibitionFair)
exhibitionFairRouter.put( '/:exhibitionId', auth, isEmployee, updateExhibitionFair)



module.exports = exhibitionFairRouter