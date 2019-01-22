const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const ObjectId = require('mongodb');

var userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validator:{
            validator: validator.isEmail,
            message: '{VLAUE} is not valid'
        }
    },
    password:
    {
        type: String,
        required: true,
        tokens: [{
            access: {
                type: String,
                required: true
            }
        },{token:{
            type: String,
            required: true
        }
    }]
    }
})

// userSchema.method.toJSON = function (){
//     var users =this;
//     var userObject  = users.toObject()
//     return _.pick(userObject,['_id','userName' ,'emailId' ])
// }

userSchema.methods.generateAuthToken = function () {   //userSchema is an object and we can add any method i.e. generateAuthTOken
    var user = this ;   //es-6 arrow function dont bind 'this' keywords and 'this' keyword stores individual document
    var access = 'auth'
    var token = jwt.sign({_id: user._id.toHexString()}, 'abc123').toString();
    
    user.tokens = user.tokens.push({token, access})

    return user.save().then(()=>{
        return token
    })
}

var users = mongoose.model('Users', userSchema);

module.exports = {users}