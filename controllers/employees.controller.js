const employeesModel = require('../models/employees.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { handdleError} = require('../utils/functions');


function createEmployee(req, res){
  const hashed_password = bcrypt.hashSync(req.body.password, 10)

  const hashed_body = {
    name: req.body.name,
    surname: req.body.surname,
    position: req.body.position,
    telephone: req.body.telephone,
    email: req.body.email,
    password: hashed_password
  }

  employeesModel
    .create(hashed_body)
    .then((employee) => {

      const insideToken = {
        name: employee.name,
        surname: employee.surname,
        id: employee._id,
        position: employee.position
      }

      const token = jwt.sign(
        insideToken,
        process.env.SECRET
      )

      const resEmployee = {
        id: employee._id,
        name: employee.name,
        surname: employee.surname,
        email: employee.email,
        token: token
      }
      res.json(resEmployee)
    })
    .catch((err) => { res.json(err) })
}


function updateEmployee(req, res) {
  console.log(req.params)
  employeesModel
	  .findByIdAndUpdate(req.params.employeeId, req.body, {
      new: true,
    })
    .then(employee => res.json(employee))
    .catch((err) => handdleError(err, res))
}

function getEmployee(req, res) {
	employeeId = req.params.employeeId;
	employeesModel
		.findById(employeeId)
		.then((employee) => {
			res.json(employee)
		})
		.catch((err) => res.json(err))
}

function deleteEmployee(req, res){
	employeesModel
		.deleteOne({"_id": req.params.employeeId })
		.then((employeeId) => {
			res.json(employeeId);
		})
		.catch((err) => handdleError(err, res))
}

function getAllEmployees(req, res) {
  employeesModel
  .find()
  .then((employees) => {
      res.json(employees)
    })
  .catch((err) => handdleError(err, res))
}

function filterEmployees(req, res){
  let queries = []
  if (req.query.name) queries.push({ name : {'$regex': req.query.name, '$options' : 'i' }})
  if (req.query.position) queries.push({ position: {'$regex': req.query.position, '$options' : 'i' }})
    employeesModel
      .find({ $or: queries })
      .then((employees) => { 
				res.json(employees);
			})
      .catch((err) => res.json(err))
  }


module.exports = { 
  createEmployee,
  updateEmployee,
  getEmployee,
  deleteEmployee,
  getAllEmployees,
  filterEmployees
}