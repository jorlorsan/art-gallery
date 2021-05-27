const mongoose = require('mongoose')
const {publicationsSchema} = require('./publications.model')

const artistsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    alias: String,
    artworks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artwork'
    }],
    dateOfBirth: Date,
    dateOfDeath: Date,
    country: {
        type: String,
        required: true
    },
    website: String,
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
          validator(value) {
            return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
          }
        },
        unique: [true, "This is email is registered"]
      },
    telephone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{3}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
      },
    publications: [ publicationsSchema ]  

})

const artistsModel = mongoose.Model('artist', artistsSchema)
module.exports = artistsModel