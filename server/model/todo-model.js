const mongoose = require('mongoose');

var Todo = mongoose.model('ToDos', ({
    text: {type: String, 
        required: true, 
        minlength: 1, 
        trim: true},
    commpleted:  {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
        }
})
);

module.exports = {Todo}