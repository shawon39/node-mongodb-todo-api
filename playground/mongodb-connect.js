//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// var user = {name: 'shawon', age: 24 };
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB Server!');
    }
    console.log('Connected to MongoDB Server!');

    var db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //
    //     text: 'Something to do',
    //     completed: false
    //
    // }, (err, result) => {
    //
    //     if(err) {
    //         return console.log('Unable to Insert Todo!', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //
    // });

    db.collection('Users').insertOne({

        name: 'Shawon',
        age: 23,
        location: 'Dhaka'

    }, (err, result) => {

        if(err) {
            return console.log('Unable to insert Todo', err);
        }
        console.log(result.ops[0]._id);
        //console.log(result.ops[0]._id.getTimestamp());

    });

    client.close();
});
