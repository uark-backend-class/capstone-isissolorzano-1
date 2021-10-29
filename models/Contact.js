const mongoose = require('mongoose');
const Appointment = require('./Appointment');

const contactSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
      }]
},
{timestamps: true});

//model based on schema

const Contact = mongoose.model('contact', contactSchema);
module.exports = Contact;