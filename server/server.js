var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos,
            test: 'We Can send custom message'
        });
        // res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};






// 1st part

// var mongoose = require('mongoose');
//
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp2');

// var Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: 5
//     }
// });

// var newTodo = new Todo ({
//     text: 'Cook dinner',
//     completed: false,
//     completedAt: 15
// });

// var newTodo = new Todo ({
//     text: 43534
// });
//
//
// newTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 4));
// }, (err) => {
//     console.log('Unable to save todo', err);
// });


// Challenge

// var User = mongoose.model('User', {
//     email: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//     }
// });
//
// var newUser = new User({
//     email: 'shshawon39@gmail.com'
// });
//
// newUser.save().then ((doc) => {
//     console.log(JSON.stringify(doc,undefined,4));
// }, (err) => {
//     console.log('Unable to add email', err);
// });


















//
