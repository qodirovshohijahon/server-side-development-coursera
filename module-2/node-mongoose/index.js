const mongoose = require('mongoose')
const Dishes = require('./models/dishes')
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url)


connect.then((db) => {
  console.log('DB server connected correctly...');

  var newDish = Dishes({
    name: 'Uthappuzza',
    description: 'test'
  });


  newDish.save()
    .then((dish) => {
      console.log('Added - ', dish);

      return Dishes.find({}).exec();
    })
    .then((dishes) => {
      console.log('Dishes - ', dishes);

      return Dishes.remove({})
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});