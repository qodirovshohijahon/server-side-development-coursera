const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const dboper = require('./operations')

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {

  // assert.equal(err, null);

  console.log('Connected correctly to server...');

  const db = client.db(dbname)
  
  dboper.insertDocument(db, {name: 'Vadanout', description: 'Test'}, 'dishes')
  .then((result) => {
    console.log('Insert Document: \n ', result.ops)

    return dboper.findDocument(db, 'dishes')
  })
  .then((docs) => {
    console.log('Found Document: \n ', docs);

    return dboper.updateDocument(db, {name: 'Vadanout'}, { description: "Updated Test"}, 'dishes')
  })
  .then((result) => {
    console.log('Updated Document \n', result.result);

    return dboper.findDocument(db, 'dishes')
  })
  .then((docs) => {
    console.log('Found Document: \n ', docs);

    return db.dropCollection('dishes')
  })
  .then((result) => {
    console.log('Dopped Collection: ', result);
    
    client.close();
  })
  .catch((err) => console.log(err));
})
.catch((err) => console.log(err));
  // collection.insertOne({"name": "Uthppizza", "description": "test description"}, (err, result) => {
  //   assert.equal(err, null);

  //   console.log('After Insert : \n');
  //   console.log(result.ops);

  //   collection.find({}).toArray((err, docs) => {
  //     assert.equal(err, null);

  //     console.log('Found:\n');
  //     console.log(docs);

  //     db.dropCollection('dishes', (err, result) => {
  //       assert.equal(err, null);

  //       // console.log("db closed ---", client.close());
  //       client.close();
  //     })
  //   })
  // })
