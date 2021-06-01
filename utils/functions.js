const jwt = require('jsonwebtoken')

function handdleError(err, res) { return res.status(400).json(err); }


function auth(req, res, next) {
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

function isEmployee(req, res, next) {
  console.log(res.locals)
if (res.locals.type === "Employee") { 
next()
} else res.json("No está autorizado")
}

module.exports = {
    handdleError,
    auth,
    isAdmin,
    isEmployee
  }