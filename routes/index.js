const router = require('express').Router();
const appointment = require('../controllers/appointment-controller');
const contact = require('../controllers/contact-controller');
const auth = require('../controllers/auth-controller');

router.post('/login', auth.login);
router.get('/login', auth.loginPage);
router.get("/register", auth.registrationPage);//will bring the registration form 
router.post('/register', auth.register, auth.login); //will submit the info in form to db




router.use(auth.isAuthenticated);
//All of this is secured. 
//homepage for all 
router.get("/", auth.homePage);
//list of appointments
router.get("/allAppointments", appointment.listAppointmentsPage);
//button that shows form to add new contact
router.get("/addAppointment", appointment.addEditAppointmentFormPage);
//button that Shows Edit form for a contact
router.get("/edit/:id", appointment.addEditAppointmentFormPage); 
//Delete a contact & redirect to homepage 
router.get("/delete/:id", appointment.deleteAppointment);
//button that submits/Adds new contact or updated info to db & redirect to homepage
router.post("/createUpdateAppointment", appointment.createUpdateAppointment); //done
//get all contacts to select from table
router.get("/pushContacts/:id", appointment.pushContactsPage);
router.post('/pushContacts/:id', appointment.pushContacts);



//list of contacts
router.get("/allContacts", contact.listContactsPage);
//button that shows form to add new contact    
router.get("/addContact", contact.addEditContactFormPage); 
//button that Shows Edit form for a contact
router.get("/editContact/:id", contact.addEditContactFormPage); 
//Delete a contact & redirect to homepage 
router.get("/deleteContact/:id", contact.deleteContact);
//button that submits/Adds new contact or updated info to db & redirect to homepage...contains the design form for adding/editing contact
router.post("/createUpdateContact", contact.createUpdateContact); //done



//router.get('/secrets', (req, res) => res.send('All secrets'));
router.get('/logout', auth.logout);

module.exports = router;