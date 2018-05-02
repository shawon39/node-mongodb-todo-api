const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb'); // later added

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Create  new data
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

// Get all data
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

// Getting data by Individual Id
app.get('/todos/:id', (req, res) => {
    //res.send(req.params);
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((err) => {
        res.status(400).send();
    });

});

//Delete Data
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((err) => {
        res.status(404).send();
    });
});



app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    //console.log(body);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed ) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) => {
        res.status(404).send();
    });
});



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
