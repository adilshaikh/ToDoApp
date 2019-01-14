var express = require('express');
var {mongoose} = require('./db/mongoose');
var bodyParser = require('body-parser');

var {Todo} = require('./model/todo-model');
var {users} = require('./model/user-model');

var app = express();
app.use(bodyParser.json())
app.post('/todos', (req, res)=>{
    var todo = new Todo ({
        text: req.body.text
    })

    todo.save().then((doc)=>{
        res.send(doc)
    },(e)=>{
        res.status(400).send(e)   
     })
})

// app.post('/users',(req, res)=>{
//     var newUser = new users(
//         {userName: req.body.userName},
//         {emailId: req.body.emailId}
//     )
//     newUser.save().then((res)=>{
//         res.send(res)
//     },
//     (e)=>{
//         res.status(400).send(e)
//     })
// })

app.get('/todos',(req, res)=>{
    Todo.find().then((doc)=>{
        res.send(doc)
    }, 
    (e)=>{
        res.status(400).send(e)
    })
})
app.listen(3000, ()=>{
    console.log('Server is running at localhost://3000')
})

module.exports = {
    app
};