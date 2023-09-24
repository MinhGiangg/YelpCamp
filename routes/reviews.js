const express = require('express');
const router = express.Router({mergeParams:true});

//const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const { reviewSchema } = require('../schemas.js');
// const Campground = require('../models/campground');
// const Review = require('../models/review');
const reviews = require('../controllers/reviews')
const { validateReview,  isLoggedIn, isReviewAuthor } = require('../middleware');
// const validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     //pass the entire body in to validate
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',');
//         throw new ExpressError(msg, 400);
//     } else {
//         next();
//     }
//     console.log('Done with validateReview');
// }

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));
router.delete('/:reviewId', isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;