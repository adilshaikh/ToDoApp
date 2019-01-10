const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
    if (err){
        return console.log('Unable to connect to MongDB server');
    } 
    console.log('Connected to MongoDB Server');
   const db = client.db('TodoApp');
        //delte many method
//    db.collection('Todos').deleteMany({text: 'Something to do.'}).then((result)=>{
//        console.log(result)
//    })
        //deleteone method
//    db.collection('Todos').deleteOne({completed: false}).then((res)=>{
//        console.log(res)
//    })
        //find and delete method is super handy as it displays the deleted object
    db.collection('Todos').findOneAndDelete({text: 'Laundary'}).then((res)=>{
        console.log(res)
    })
    client.close();
})