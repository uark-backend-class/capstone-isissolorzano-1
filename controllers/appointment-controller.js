const momentTimeZone = require('moment-timezone');
const Appointment = require('../models/Appointment');
const moment = require('moment');
const Contact = require('../models/Contact');


/*const getTimeZones = function() {
    return momentTimeZone.tz.setDefault();
  };
*/


exports.listAppointmentsPage = async (req, res) => {
    const appointments = await Appointment.find().lean();
    res.render('list-appointments.handlebars', {title: 'Reminders', appointments});
};

exports.addEditAppointmentFormPage = async (req,res) => {
    if(req.params.id){
        const appointment = await Appointment.findById({_id: req.params.id}).lean();
        res.render("add-edit-appointment.handlebars", { title: 'Edit Reminder', appointment });
    }
    else {
        res.render('add-edit-appointment.handlebars', {title: 'Add Reminder'});
    }
};

exports.createUpdateAppointment = async(req, res) => {
    if(req.body.id) {
        await Appointment.findByIdAndUpdate(req.body.id, req.body);
    }
    else{
      
    const appointment = new Appointment({
        name: req.body.name,
        notification: req.body.notification,
       // timeZone: momentTimeZone.tz.setDefault(),
        time: moment(req.body.time, 'YYYY-MM-DDThh:mm'),
        message: req.body.message,
        contacts: [],
    });
    
    await appointment.save();
    }
    res.redirect('/allAppointments');
}



exports.deleteAppointment = async (req, res) => {
    await Appointment.findByIdAndDelete({_id: req.params.id});
    res.redirect("/allAppointments"); 
};


exports.pushContactsPage = async(req, res) => {
    let appointment = await Appointment.findById({_id: req.params.id}).populate('contacts').lean();
    const contacts = await Contact.find().lean();
    res.render('push-contacts.handlebars', {title: 'Contacts', contacts, appointment});
};

exports.pushContacts = async(req, res) => {
    let appointment = await Appointment.findById({_id: req.params.id}); 
    for (let contactId in req.body.contacts){
        let contact = await Contact.findById(contactId);
        appointment.contacts.push(contact);
    }
    await appointment.save();
    console.log(req.body);
    
    res.redirect('/pushContacts/'+ req.params.id); 
}


