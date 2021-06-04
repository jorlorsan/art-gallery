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

shipmentRouter.get( '/', auth, isAdmin, getAllShipments)
shipmentRouter.post( '/', auth, isAdmin, createShipment)
shipmentRouter.get( '/filter', auth, isAdmin, filterShipments)
shipmentRouter.get('/:shipmentId', auth, isAdmin, getShipment)
shipmentRouter.delete('/:shipmentId', auth, isAdmin, deleteShipment)
shipmentRouter.put('/:shipmentId', auth, isAdmin, updateShipment)


module.exports = shipmentRouter
