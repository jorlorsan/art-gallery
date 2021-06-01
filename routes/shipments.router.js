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
shipmentRouter.get('/:shipmentId', getShipment)
shipmentRouter.delete('/:shipmentId', deleteShipment)
shipmentRouter.put('/:shipmentId', updateShipment)


module.exports = shipmentRouter
