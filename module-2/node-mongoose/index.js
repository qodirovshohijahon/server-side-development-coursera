const mongoose = require('mongoose')
const Dishes = require('./models/dishes')
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url)


connect.then((db) => {
  console.log('DB server connected correctly...');

  Dishes.create({
    name: 'Just pizza',
    description: 'testhcek'
  })
  .then((dish) => {
    console.log('Added - ', dish);

    return Dishes.findByIdAndUpdate(dish._id, {
        $set: { description: 'Updated test'}
      },{ new: true }).exec();
  })
  .then((dish) => {
    console.log('Dishes - ', dish);
    dish.comments.push({
      rating: 5,
      comment: 'I am a comment',
      author: 'Leonardo De Sancho'
    });
    return dish.save();
  })
  .then((dish) => {
    console.log('Dish with comment: ', dish);
    return Dishes.remove({})
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
});