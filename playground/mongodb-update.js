//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB Server!');
    }
    console.log('Connected to MongoDB Server!');

    var db = client.db('TodoApp');

    // Updating data

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5ae4bc1eaf323f5bc0ebb4b4')
    }, {
        $set: {
            completed: false,
            text: 'Kutta re hataite hoibo'
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // Challenge

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5ae36f66361e7425a49c31c0')
    }, {
        $set: {
            name: 'Shakhawat'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    //client.close();
});











//
