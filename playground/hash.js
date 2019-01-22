const  {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
var data ={
    id: 4
}

var token = jwt.sign(data, '123abc');  //takes the object and sign it create the hash //values get save to token array
console.log(token) 
var verify = jwt.verify(token, '123abc') ;// takes the token and secret and makes sure that data was not manupulated
 console.log(verify)    






// var message = 'Dranzer@123'
// var Hashing = SHA256(message).toString()
// console.log(`Before Hashing: ${message}`);
// console.log(`After Hashing: ${Hashing}`);

// var data = {
//     id: 10
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'some secret').toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data)+ 'some secret').toString()

// // token.data.id = 1
// // token.hash = SHA256(JSON.stringify(token.data)+ 'some secret').toString()

// if(resultHash === token.hash){
//     console.log('Data was not changed')
// }else{
//     console.log('Data was changed. Dont trust it.')
// }