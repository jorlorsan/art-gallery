const jwt = require('jsonwebtoken')
const shipmentRouter = require('express').Router()
const { auth, isAdmin } = require('../utils/functions')

const {
    getAllShipments, 
    createShipment,
    filterShipments,
    deleteShipment,
    getShipment,
    updateShipment
} = require('../controllers/shipments.controller')

shipmentRouter.get( '/', getAllShipments)
shipmentRouter.post( '/', auth, isAdmin, createShipment)
shipmentRouter.get( '/filter', filterShipments)
shipmentRouter.get('/:publicationId', getShipment)
shipmentRouter.delete('/:publicationId', deleteShipment)
shipmentRouter.put('/:publicationId', updateShipment)


module.exports = shipmentRouter
