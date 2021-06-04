const mongoose = require('mongoose')

const documentsSchema = new mongoose.Schema({
    documentType: {
        type: String,
        enum: {
            values: ['Invoice', 'Loan', 'Certificate of Authenticity', 'Contract'],
            message: '{VALUE} is not supported'
            },
        required: true       
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
    price: {
      type: Number,
      required: true
    },
    parties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contact'
      }],
    documentNo: {
      type: String,
      required: true
    }
})

const documentsModel = mongoose.model('document', documentsSchema)
module.exports = documentsModel