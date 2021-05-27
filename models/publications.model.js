const mongoose = require('mongoose')

const publicationsSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: Date,
    publisher: String,
    signed: {
        type: String,
        enum: {
            values: ['Yes', 'No'],
            message: '{VALUE} is not supported'
        }
   },
   condition: {
    type: String,
    enum: {
        values: ['New', 'Secondhand'],
        message: '{VALUE} is not supported'
       }   
    },
    type: {
    type: String,
    enum: {
        values: ['Catalogue', 'Monograph', 'General'],
        message: '{VALUE} is not supported'
       }   
    },
    ISBN: String,
    stock:{
    type: String,
    enum: {
        values: ['Available', 'Sold'],
        message: '{VALUE} is not supported'
        }   
    },
    location: String,
    currency: {
        type: String,
        default: "EUR"  
    },  
    price: Number 
})

const publicationsModel = mongoose.Model('publication', publicationsSchema)
module.exports = {publicationsSchema, publicationsModel} 