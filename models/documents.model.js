const mongoose = require('mongoose')

const documentsSchema = new mongoose.Schema({
    documentType: {
        type: String,
        enum: {
            values: ['Invoice', 'Loan', 'Certificate of Authenticity', 'Contract'],
            message: '{VALUE} is not supported'
            }   
        },
    artwork: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'artwork'
    }],
    artist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artist'
      }],
    date: Date,
    currency: {
        type: String,
        default: "EUR"  
    },  
    price: Number,
    parties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contact'
      }],
    invoiceNumber: String
})

const documentsModel = mongoose.Model('document', documentsSchema)
module.exports = documentsModel