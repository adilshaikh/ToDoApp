const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
    if (err){
        return console.log('Unable to connect to MongDB server');
    } 
    console.log('Connected to MongoDB Server');
   const db = client.db('TodoApp');
        //findOneAndUpdate({filtering_Object}, update{object.valueToBeChanged}, options{returnOriginal: false}, callback)
        
  db.collection('Users').findOneAndUpdate({name: 'Dungeon Hunter'},
  {
      $set:{
          location: 'Bombay'
      },
  },{
    returnOriginal: false
  }).then((result)=>{console.log(result)})
  client.close();
})