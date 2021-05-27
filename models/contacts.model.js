const mongoose = require('mongoose')

const contactsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
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
    street: String,
    city: String,
    postcode: String,
    country: String,
    notes: {
        type: String,
        max: 255
    },
    exhibitionsVisited: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exhibitions-fair'
    }],
    artworkAcquired: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artwork'
    }],
    type: {
        type: String,
        enum: {
            values: ['Collector', 'Admin', 'Employee', 'Visitor', 'Shipper'],
            message: '{VALUE} is not supported'
           }   
        },
    password: { 
        type: String, 
        required: true 
    },
    image: String,
    relatedContacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contact'
    }]   
})

const contactsModel = mongoose.Model('contact', contactsSchema)
module.exports = contactsModel