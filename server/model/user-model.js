const mongoose = require('mongoose')

var users = mongoose.model('Users',({
    userName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
}));

module.exports = {users}