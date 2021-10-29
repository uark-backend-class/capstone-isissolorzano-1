const Appointment = require('../models/Appointment');
const Contact = require('../models/Contact');


exports.listContactsPage = async (req, res) => {
    const contacts = await Contact.find().lean();
    res.render('list-contacts.handlebars', {title: 'Contacts', contacts});
};

exports.addEditContactFormPage = async (req,res) => {
    if(req.params.id){
        const contact = await Contact.findById(req.params.id).lean();
        res.render("add-edit-contact.handlebars", { title: 'Edit Contact', contact });
    }
    else {
        res.render('add-edit-contact.handlebars', {title: 'New Contact'});
    }
};

exports.createUpdateContact = async(req, res) => {
    if(req.body.id) {
        await Contact.findByIdAndUpdate(req.body.id, req.body);
    }
    else{
       
        const contact = new Contact({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,      
    });

        
        await contact.save();
    }
    res.redirect('/allContacts'); 
}

exports.deleteContact = async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/allContacts'); 
};


