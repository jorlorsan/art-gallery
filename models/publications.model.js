const mongoose = require('mongoose')


const publicationsModel = mongoose.Model('publication', publicationsSchema)
module.exports = {publicationsSchema, publicationsModel} 