const {ObjectID} = require('mongodb');

const mongoose = require('./../server/db/mongoose');
const {Todo} = require('./../server/model/todo-model')

const {users} = require('./../server/model/user-model')

//var id = '5c3cd6c42c7a9ba27d9a8bf4';
var id = '5c3b30c018b5f1b87815bfdd'

if (!ObjectID.isValid(id)){
    console.log('User doesnot exist.')
}


users.find().then((user)=>{
    console.log(JSON.stringify(user, undefined, 2))
})

users.findOne({_id: id}).then((user)=>{
    console.log('User Founded', user)
})

users.findById({_id: id}).then((user)=>{
    if (!user){
        return console.log('User not found')
    } console.log('User founded by id', user)
}).catch((e)=>{console.log(e)})

// Todo.find().then((todos)=>{
//     console.log('Todos' , todos)
// })

// Todo.findOne({_id: id}).then((todo)=>{
//     console.log('Todo', todo)
// })

// Todo.findById(id).then((user)=>{
//     if(!user){
//         return console.log('Id not found.')
//     }
//     console.log('User found:', todo)
// }).catch((e)=>{console.log(e)})