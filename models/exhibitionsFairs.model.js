const mongoose = require('mongoose')

const exhibitionsFairsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    openingDate: {
        type: Date,
        required: true
    },
    closingDate: {
        type: Date,
        required: true
    },
    location: String,
    artworks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artwork'
    }],
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artist'
    }] 
})

const exhibitionsFairsModel = mongoose.model('exhibitions-fair', exhibitionsFairsSchema)
module.exports = exhibitionsFairsModel