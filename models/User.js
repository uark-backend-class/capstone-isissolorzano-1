const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
    },
);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email'});

const User = mongoose.model('user', userSchema);
module.exports = User;