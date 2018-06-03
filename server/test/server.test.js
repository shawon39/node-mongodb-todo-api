const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

// Modified for GET Method !

// const todos = [{
//     _id: new ObjectID(), // Later Added
//     text: 'First Text'
// }, {
//     _id: new ObjectID(), // Later Added
//     text: 'Second Text', // Initial Added
//     completed: true,    // Later of later Added
//     completedAt: 333    // Later of later Added
// }];

// Modified for GET Method !

beforeEach(populateTodos);
beforeEach(populateUsers);

// Modified for GET Method !
describe('POST /todos', () => {

    it('Should create a new todo', (done) => {

        var text = 'Hello !';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err));
            });
        });

    it('Should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => done(err));

            });
        });

});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('Should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
        //console.log(todos[0]._id.toHexString());
        //console.log(todos[0]._id);
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
          .get(`/todos/${hexId}`)
          .expect(404)
          .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
          .get('/todos/123abc')
          .expect(404)
          .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
          .delete(`/todos/${hexId}`)
          .expect(200)
          .expect((res) => {
             expect(res.body.todo._id).toBe(hexId);
          })
          .end((err, res) => {
             if(err) {
                 return done(err);
             }

             Todo.findById(hexId).then((todo) => {
                expect(todo).toNotExist();
                done();
            }).catch((err) => done(err));
          });
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        //var hexId = todos[1]._id.toHexString();

        request(app)
          .get(`/todos/${hexId}`)
          .expect(404)
          .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        request(app)
          .get('/todos/123abc')
          .expect(404)
          .end(done);
    });

});

describe('PATCH /todos/:id', () => {

    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'This is updated text! Nice!';

        request(app)
          .patch(`/todos/${hexId}`)
          .send({
              completed: true,
              text
          })
          .expect(200)
          .expect((res) => {
              expect(res.body.todo.text).toBe(text);
              expect(res.body.todo.completed).toBe(true);
              expect(res.body.todo.completedAt).toBeA('number');
          })
          .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'This is updated text! wow !';

        request(app)
          .patch(`/todos/${hexId}`)
          .send({
              completed: false,
              text
          })
          .expect(200)
          .expect((res) => {
              expect(res.body.todo.text).toBe(text);
              expect(res.body.todo.completed).toBe(false);
              expect(res.body.todo.completedAt).toBe(null);
          })
          .end(done);
    });
});


describe('GET /users/me', () => {

    it('Should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    it('Should return 401 if not authenticated', (done) => {

        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done)
    });

});

describe('POST /users', () => {

    it('Should Craete a user', (done) => {
        var email = 'shawon12@gmail.com';
        var password = '123mbn!';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if(err) {
                    return done();
                }

                User.findOne({email}).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                });
            });
    });

    it('Should return validation errors if request invalid', (done) => {
        request(app)
            .post('/users')
            .send({
                email: 'Sawon',
                password: '12abd'
            })
            .expect(400)
            .end(done)
    });

    it('should not create a user if email in use', (done) => {
        request(app)
            .post('/users')
            .send({
                email: users[0].email, // 'shawon39@gmail.com'
                password: 'Password123!'
            })
            .expect(400)
            .end(done)
    });

});






