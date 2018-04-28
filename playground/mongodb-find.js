//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB Server!');
    }
    console.log('Connected to MongoDB Server!');

    var db = client.db('TodoApp');

    // db.collection('Todos').find({_id: new ObjectID('5ae367fda48c0d26480bc08c')}).toArray().then((docs) => {
    //     console.log('Todos....');
    //     console.log(JSON.stringify(docs, undefined, 4));
    // }, (err) => {
    //     console.log('Unable to fetch todos');
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos');
    // });

    // Challenge

    db.collection('Users').find({name: 'Shawon'}).count().then((count) => {
        console.log(`Users: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos');
    });

    //client.close();
});











//
