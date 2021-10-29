const User = require("../models/User");
const passport = require("passport");

exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }
}



exports.registrationPage = async(req, res) => {
    res.render('register');
}


exports.register = async (req, res, next) => {
    const user = new User({email: req.body.email});//will enter new email into db
    await User.register (user, req.body.password);

    next();
}


exports.login = passport.authenticate('local', {
    failureRedirect: '/login',

    successRedirect: '/',
});

exports.loginPage = (req, res) => {
    res.render('login');
}

exports.homePage = async(req, res) => {
    res.render('home.handlebars');
}  

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
}
    