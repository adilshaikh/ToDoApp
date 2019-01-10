const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
    if (err){
        return console.log('Unable to connect to MongDB server');
    } 
    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp')

    db.collection('Todos').insertOne({
        text: 'Something to do.',
        completed: false
    }), (err, result)=>{
        if(err){
            return console.log('Unable to write to database', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
        client.close();
    }

    db.collection('Users').insertOne({
        name: 'Dranzer',
        Age: 24,
        Location:'Dublin, Ireland'
    },(err, result)=>{
        if (err){
            return console.log('Unable to write the DB', err)
        }console.log(JSON.stringify(result.ops, undefined, 2)) //result.ops array of documents that get inserted.
        client.close();
    })
    
})