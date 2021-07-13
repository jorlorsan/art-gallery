const jwt = require('jsonwebtoken')
const employeeRouter = require('express').Router()
const { auth, isAdmin } = require('../utils/functions')

const { 
    createEmployee,
    updateEmployee,
    getEmployee,
    deleteEmployee,
    getAllEmployees,
    filterEmployees
} = require('../controllers/employees.controller')

employeeRouter.get( '/', auth, isAdmin, getAllEmployees)
employeeRouter.get('/filter', auth, isAdmin, filterEmployees)
employeeRouter.get('/:employeeId', auth, isAdmin, getEmployee)
employeeRouter.post( '/', auth, isAdmin, createEmployee)
employeeRouter.delete('/:contactId', auth, isAdmin, deleteEmployee)
employeeRouter.put('/:contactId', auth, isAdmin, updateEmployee) /*tendría que ser solo la tuya*/

module.exports = employeeRouter
