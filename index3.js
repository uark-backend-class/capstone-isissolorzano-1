require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const User = require('./models/User');
const passport = require('passport');
const session = require('express-session');
const schedule = require('./schedule');
require('./db');

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
})

const app = express();
app.use(
    session({
      secret:'my secret'  
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.urlencoded());
app.use(routes);

schedule.start(); //scheduler for reminders


app.listen(process.env.PORT, () =>{
    console.log('Listening on port 3000');
});