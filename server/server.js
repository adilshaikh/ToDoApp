var express = require('express');
var {mongoose} = require('./db/mongoose');
var bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
var {Todo} = require('./model/todo-model');
var {users} = require('./model/user-model');
const jwt = require('jsonwebtoken');

const _= require('lodash');

const port = process.env.PORT 

var app = express();
app.use(bodyParser.json())
app.post('/todos', (req, res)=>{
    var todo = new Todo ({
        
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    })

    todo.save().then((doc)=>{
        res.send(doc)
    },(e)=>{
        res.status(400).send(e)   
     })
})



app.get('/todos/:id', (req, res)=>{
    var id = req.params.id
    if(!ObjectId.isValid(id)){
        return res.status(404).send()
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
        return res.status(404)} {res.send({todo})}
    }).catch((e)=>{res.status(404).send(e)})
})

app.delete('/todos/:id', (req, res)=>{
    var id = req.params.id
    
    if(!ObjectId.isValid(id)){
    return res.status(404).send()
    }

    if(_.isBoolean(body.completedAt) && completedAt){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false,
        body.completedAt = null
    }
    

    Todo.findByIdAndDelete(id).then((todo)=>{
        if(!todo){
            return res.status(404)
        } res.status(200).send(todo)
    }).catch((e)=>{res.status(404).send(e)})



})




app.get('/todos',(req, res)=>{
    Todo.find().then((doc)=>{
        res.send(doc)
    }, 
    (e)=>{
        res.status(400).send(e)
    })
})
//update request
app.patch('/todos/:id',(req, res)=>{
var id = req.params.id
var body = _.pick(req.body,['text', 'completed', 'completedAt'])
if(!ObjectId.isValid(id)){
    res.status(404).send()
}
if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime()
}else{
    body.completed = false,
    body.completedAt = null
}
Todo.findByIdAndUpdate(id,{$set: body},{returnOriginal: false}).then((doc)=>{
    if(!doc){
        res.status(404).send()
    }{res.status(200).send(doc)}
}).catch((e)=>{res.status(404).send(e)})


})
// _______________________________________________________________________________________
//Users APIs Request

app.post('/users',(req, res)=>{
    var body = _.pick(req.body,['userName', 'emailId', 'password'])
      var user = new users(body)
    
    // var user = new users ({
    //     id : req.body._id,
    //     userName : req.body.userName,
    //     emailId :  req.body.emailId,
    //     password : req.body.password,
    //     tokens: req.body.password.tokens,
    //     access: req.body.password.access
    // })
    
    user.save().then(()=>{
        return user.generateAuthToken(); 
    }).then((token)=>{
        res.header('x-auth', token).send({user})
    }).catch((e)=>{
        res.status(400).send(e)
    })
   

    
})

//app listening on Port
app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})

module.exports = {
    app
};