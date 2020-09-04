const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
  .get((req, res, next) => {
    Promotions.find({})
      .then((promotions) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(promotions)
//        console.log('Promo => ', res.json(promotions));
      }, (err) => next(err))
      .catch((err) => next(err));
    })

  .post((req, res, next) => {
    Promotions.create(req.body)
      .then((promotion) => {
        console.log('Promo Created', promotion);
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(promotion);
      }, (err) => next(err))
      .catch((err) => next(err))
  })

  .put((req, res, next) => {
    res.statusCode = 403
    res.end('PUT operation not supported on /promotions')
})

  .delete((req, res, next) => {
    Promotions.remove({})
      .then((resp) => {
        console.log('Promo Deleted', resp);
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err))
  })

promoRouter.route('/:promotionId')
  .get((req, res, next) => {
    Promotions.findById(req.params.promotionId)
    .then((promotion) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json(promotion)
//      console.log('Promo => ', res.json(promotion));
    }, (err) => next(err))
    .catch((err) => next(err));
  })

  .post((req, res, next) => {
    res.statusCode = 403
    res.end('POST operation not supported on /promotions ' + req.params.promotionId)
})

  .put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promotionId, {
      $set: req.body
    }, { new: true })
    .then((promotion) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json(promotion)
//      console.log('Promo => ', res.json(promotion));
    }, (err) => next(err))
    .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promotionId)
      .then((resp) => {
        console.log('Promo Deleted', resp);
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(resp);
      }, (err) => next(err))
    .catch((err) => next(err))
  });

   /* ------------------------------------ */


//    promoRouter.route('/:promotionId/comments')
//    .get((req, res, next) => {
//      Promotions.findById(req.params.promotionId)
//        .then((promotion) => {
//          if (promotion != null) {
//           res.statusCode = 200
//           res.setHeader('Content-Type', 'application/json')
//           res.json(promotion.comments)
//          }
//          else {
//            err = new Error('Promo ' + req.params.promotionId + ' not found')
//            err.statusCode = 404;
//            return next(err) // Agar error bo'lsa asosiy error midlleware ga yuboramiz
//          }
//        }, (err) => next(err))
//        .catch((err) => next(err));
//      })
 
//    .post((req, res, next) => {
//      Promotions.findById(req.params.promotionId)
//        .then((promotion) => {
//         if (promotion != null) {
//           promotion.comments.push(req.body);
//           // console.log('Promo comment - 1 --- \n', promotion.comments.push(req.body));
//           promotion.save()
//           .then((promotion) => {
//             res.statusCode = 200
//             res.setHeader('Content-Type', 'application/json')
//             res.json(promotion.comments)
//             // console.log('JSON Promo - \n ',res.json(promotion.comments));
//           }, (err) => next(err))
//          }
//          else {
//            err = new Error('Promo ' + req.params.promotionId + ' not found')
//            err.statusCode = 404;
//            return next(err) // Agar error bo'lsa asosiy error midlleware ga yuboramiz
//          }
//        }, (err) => next(err))
//        .catch((err) => next(err))
//    })
 
//    .put((req, res, next) => {
//      res.statusCode = 403
//      res.end('PUT operation not supported on /promotions'
//       + req.params.promotionId + ' /comments')
//  })
 
//    .delete((req, res, next) => {
//      Promotions.findById(req.params.promotionId)
//        .then((promotion) => {
//         if (promotion != null) {
//           for (var i = (promotion.comments.length - 1); i >= 0; i--) {
//             promotion.comments.id(promotion.comments[i]._id).remove()
//           }
//           promotion.save()
//           .then((promotion) => {
//             res.statusCode = 200
//             res.setHeader('Content-Type', 'application/json')
//             res.json(promotion.comments)
//           }, (err) => next(err))
//          }
//          else {
//            err = new Error('Promo ' + req.params.promotionId + ' not found')
//            err.statusCode = 404;
//            return next(err) // Agar error bo'lsa asosiy error midlleware ga yuboramiz
//          } 
//         console.log('Promo Deleted', promotion);
//        }, (err) => next(err))
//        .catch((err) => next(err))
//    })
 
//  promotionRouter.route('/:promotionId/comments/:commentId')
//    .get((req, res, next) => {
//      Promotions.findById(req.params.promotionId)
//      .then((promotion) => {
//       if (promotion != null & promotion.comments.id(req.params.commentId) != null) {
//         res.statusCode = 200
//         res.setHeader('Content-Type', 'application/json')
//         res.json(promotion.comments.id(req.params.commentId))
//        }
//        else if (promotion == null) {
//          err = new Error('Promo ' + req.params.promotionId + ' not found')
//          err.statusCode = 404;
//          return next(err) 
//         }
//         else {
//           err = new Error('Promo ' + req.params.commentId + ' not found')
//           err.statusCode = 404;
//           return next(err) //
//         }
//     }, (err) => next(err))
//      .catch((err) => next(err));
//    })
 
//    .post((req, res, next) => {
//      res.statusCode = 403
//      res.end('POST operation not supported on /promotions ' + req.params.promotionId + 
//      ' /comments/ ' + req.params.comments)
//  })
 
//    .put((req, res, next) => {
//       Promotions.findById(req.params.promotionId)
//       .then((promotion) => {
//       if (promotion != null & promotion.comments.id(req.params.commentId) != null) {
//         if (req.body.rating) {
//           promotion.comments.id(req.params.commentId).rating = req.body.rating
//         }
//         if (req.body.comment) {
//           promotion.comments.id(req.params.commentId).comment = req.body.comment
//         }
//         promotion.save()
//         .then((promotion) => {
//           res.statusCode = 200
//           res.setHeader('Content-Type', 'application/json')
//           res.json(promotion.comments)
//         }, (err) => next(err))
//       }
//       else if (promotion == null) {
//           err = new Error('Promo ' + req.params.promotionId + ' not found')
//           err.statusCode = 404;
//           return next(err) 
//       }
//       else {
//           err = new Error('Promo ' + req.params.commentId + ' not found')
//           err.statusCode = 404;
//           return next(err) //
//       }
//     }, (err) => next(err))
//      .catch((err) => next(err));
//    })
 
//    .delete((req, res, next) => {
//     Promotions.findById(req.params.promotionId)
//        .then((promotion) => {
//         if (promotion != null && promotion.comments.id(req.params.commentId) != null) {
//             promotion.comments.id(req.params.commentId).remove()
//             promotion.save()
//             .then((promotion) => {
//               res.statusCode = 200
//               res.setHeader('Content-Type', 'application/json')
//               res.json(promotion.comments)
//             }, (err) => next(err))
//          }
//          else if (promotion == null) {
//           err = new Error('Promo ' + req.params.promotionId + ' not found')
//           err.statusCode = 404;
//           return next(err) 
//           }
//           else {
//               err = new Error('Promo ' + req.params.commentId + ' not found')
//               err.statusCode = 404;
//               return next(err) 
//           }
//        }, (err) => next(err))
//      .catch((err) => next(err))
//    });

   module.exports = promoRouter;