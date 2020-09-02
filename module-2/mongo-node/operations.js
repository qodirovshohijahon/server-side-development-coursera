const assert = require('assert')

exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.insert(document);
  // , (err, result) => {
  //   assert.equal(err, null);
  //   console.log('Inserted: ', + result.result.n + ' document into the collection ' + collection);

  //   callback(result);
  // })
};

exports.findDocument = (db, collection, callback) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray()
  // (err, docs) => {
  //   assert.equal(err, null);
  //   callback(docs)
  // })
}

exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document)
  // , (err, docs) => {
  //   assert.equal(err, null)

  //   console.log('Remove document: ', document);
  //   callback(result);
  // } )
}

exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null)
  // , (err, result) => {
  //   assert.equal(err, null)
  //   console.log('Updated document: ', update);
  //   callback(result);
  // })
}