const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// var id = '5ae767ed8e004e2ed0aaebdc1';
//
// if(!ObjectID.isValid(id)) {
//     console.log('Id not valid!');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found !');
//     }
//     console.log('Todo By Id', todo);
// }).catch((err) => console.log(err));


// Challenge

const {User} = require('./../server/models/user');

User.findById('5ae558044b1ced270cbf93c8').then((user) => {
    if(!user) {
        return console.log('Unable to find User!');
    }
    console.log(JSON.stringify(user, undefined, 4));
}, (err) => {
    console.log(err);
});



















//
