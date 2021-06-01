const jwt = require('jsonwebtoken')
const shipmentRouter = require('express').Router()
const { auth, isEmployee } = require('../utils/functions')

const {
    getAllShipments, 
    createShipment,
    filterShipments,
    deleteShipment,
    getShipment,
    updateShipment
} = require('../controllers/shipments.controller')

shipmentRouter.get( '/', auth, isEmployee, getAllShipments)
shipmentRouter.post( '/', auth, isEmployee, createShipment)
shipmentRouter.get( '/filter', auth, isEmployee, filterShipments)
shipmentRouter.get('/:shipmentId', auth, isEmployee, getShipment)
shipmentRouter.delete('/:shipmentId', auth, isEmployee, deleteShipment)
shipmentRouter.put('/:shipmentId', auth, isEmployee, updateShipment)


module.exports = shipmentRouter
