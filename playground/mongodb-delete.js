//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB Server!');
    }
    console.log('Connected to MongoDB Server!');

    var db = client.db('TodoApp');

    // DeleteMany
    db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
        console.log(result);
    });

    // // DeleteOne
    db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
        console.log(result);
        console.log(result.deletedCount);
    });

    // FindOneAndDelete
    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    });

    //------------- Challenge

    // DeleteMany
     db.collection('Users').deleteMany({name: 'Rakib'});


    // FindOneAndDelete By Id
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5ae36f3cea40391804fa5ad3')
    }).then((result) => {
        console.log(result);
    });

    //client.close();
});











//
