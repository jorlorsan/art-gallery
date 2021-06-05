const mongoose = require('mongoose')

const artworksSchema = new mongoose.Schema({
   artistId: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'artist'
   }],
   title: {
        type: String,
        required: true,
        default: "Untitled"
   },
   year: {
        type: Number // Poner como date o máximo 4 dígitos
   },
   medium: {
        type: String,
        required: true
   },
   type: {
        type: String,
        enum: {
            values: ['Painting', 'Sculpture', 'Video', 'Mixed', 'Installation', 'Work on Paper'],
            message: '{VALUE} is not supported'
        }
   },
   image: String,
   dimensions: {
       type: String,
       required: true
   },
   exhibitionHistory: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'exhibitions-fair'
   }],
   location: {
        type: String,
        enum: {
            values: ['On Display', 'Storage', 'On Loan', 'Owner' ],
            message: '{VALUE} is not supported'
        }
   },
   stockNo: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        enum: {
            values: ['Excellent', 'Good', 'Fair', 'Damaged' ],
            message: '{VALUE} is not supported'
        }
    },
    status: {
        type: String,
        enum: {
            values: ['Available', 'On Hold', 'Sold'],
            message: '{VALUE} is not supported'
        }
    },    
    currency: {
        type: String,
        default: "EUR"  
    },  
    price: Number     
})

const artworksModel = mongoose.model('artwork', artworksSchema)
module.exports = artworksModel