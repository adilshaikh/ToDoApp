const request = require('supertest');
const expect = require('expect');
const {ObjectId} = require('mongodb');
const {Todo} = require('./../model/todo-model');
const {app} = require('./../server');

const todos = [{
    _id: new ObjectId(),
    text: "First Text."
},{
    _id: new ObjectId(),
    text: "Second Text."
}]

beforeEach((done)=>{
    Todo.deleteMany({}).then(()=>{ 
        return Todo.insertMany(todos)
    }).then(()=>{done()}).catch((e)=>{console.log()})
})

describe('Testing TODO POST /todos',()=>{
    it('It should POST new object',(done)=>{
        var text = 'Testing for each todos';
        request(app)
        .post('/todos')
        .send({text})  // the data is passed in the form of object and converted to JSON via supertest
        .expect(200) //starting assertions
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err, res)=>{
            if(err){
                return done(err);
            }
            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1)
                expect(todos[0].text).toBe(text)
                done();
            }).catch((e)=>{done(e)})
                
        })
    })
    it('Should not POST  with empty string',(done)=>{
        
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res)=>{
            if(err){
                return done(err)
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2)
                done()
            }).catch((e)=>done(e))
        })
    })

})

describe('GET /todos', ()=>{
    it('Should fetch the text object', (done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done());
    })
})

// describe('GET /todos/:id',()=>{
//     it('Should get the Todos object ',(done)=>{
//         request(app)
//         .get(`/todos/${todos[0]._id.toHexString()}`)
//         .expect(200)
//         .expect((res)=>{
//             expect(res.body.todo.text).toBe(todos[0].text)
//         })
//         .end(done);
//     });
// });

// describe('GET /todos/:id',()=>{
//     it('Should return 404 error not found',(done)=>{
//         var HexID = new ObjectId().toHexString()

//         request(app)
//         .get(`/todos/${HexID}`)
//         .expect(404)
//         .end(done)

//     })
// })
