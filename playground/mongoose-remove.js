const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

// var id = '5ae95b0ad51f31fb219b669e';
// Todo.findByIdAndRemove(id).then((todo) => {
//     if(!todo) {
//         return console.log('There is no todo!');
//     }
//     console.log(todo);
// });

var id = '5ae95af6d51f31fb219b668f';
Todo.findOneAndRemove({_id: id}).then((todo) => {
    if(!todo) {
        return console.log('There is no todo!');
    }
    console.log(todo);
});



















//
