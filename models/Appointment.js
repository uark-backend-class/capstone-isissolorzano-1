const mongoose = require('mongoose');
const Contact = require('./Contact');
const moment = require('moment');
const Twilio = require('twilio');

const AppointmentSchema = new mongoose.Schema({
  name: String,
  notification: Number,
  timeZone: String,
  time: {type: Date, index: true},
  message: String,
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'contact'
  }]
  },
  {timestamps: true});

  
AppointmentSchema.methods.requiresNotification = function(date) {
  return Math.round(moment.duration(moment.tz(this.time, "America/Chicago").utc() 
                          .diff(moment(date).utc())
                        ).asMinutes()) === this.notification;
};

AppointmentSchema.statics.sendNotifications = function(callback) {
  // now
  const searchDate = new Date();
  Appointment
    .find()
    .populate('contacts')
    .then(function(appointments) {
      appointments = appointments.filter(function(appointment) {
              return appointment.requiresNotification(searchDate);
      });
      if (appointments.length > 0) {
        sendNotifications(appointments);
      }
    });


    /**
    * Send messages to all appoinment owners via Twilio
    * @param {array} appointments List of appointments.
    */
   
    function sendNotifications(appointments) {
        const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        appointments.forEach(function(appointment) {
          // Create options to send the message
          appointment.contacts.forEach(function(contact){
            const options = {
              to: contact.phone,
              from: process.env.TWILIO_PHONE_NUMBER,
              body: appointment.message
            };
            // Send the message!
            client.messages.create(options, function(err, response) {
              if (err) {
                  console.error(err);
              } 
              else {
                  // Log the last few digits of a phone number
                  let masked = contact.phone.substr(0,
                      contact.phone.length - 5);
                  masked += '*****';
                  console.log(`Message sent to ${masked}`);
              }
            });
            // Don't wait on success/failure, just indicate all messages have been
            // queued for delivery
            if (callback) {
              callback.call();
            }
          });   
        });
    };
  }    
            
            

const Appointment = mongoose.model('appointment', AppointmentSchema);

module.exports = Appointment;
