const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
    if (err){
        return console.log('Unable to connect to MongDB server');
    } 
    console.log('Connected to MongoDB Server');
    // const db = client.db('TodoApp')
    // db.collection('Todos').find({completed: true}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }), (err)=>{
    //     console.log('Unable to fetch Data')
    // }
    const db = client.db('TodoApp');
    db.collection('Users').find({_id: new ObjectID('5c34cc296b4273f8483b9d47')}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs, undefined, 2));
    },(err)=>{
        console.log(err)
    })
    client.close();
})