const mongoose = require('mongoose');

var Todo = mongoose.model('ToDos', ({
    text: {type: String, 
        required: true, 
        minlength: 1, 
        trim: true},
    completed:  {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: String,
        default: null
        }
})
);

module.exports = {Todo}