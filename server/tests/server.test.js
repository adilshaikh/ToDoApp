const request = require('supertest');
const expect = require('expect');

const {Todo} = require('./../model/todo-model');
const {app} = require('./../server');

beforeEach((done)=>{
    Todo.deleteOne({}).then(()=>{done()})
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
            Todo.find().then((todos)=>{
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
                expect(todos.length).toBe(0)
                done()
            }).catch((e)=>done(e))
        })
    })

})