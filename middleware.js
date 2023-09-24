const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review');
module.exports.isLoggedIn = (req, res, next) => {
    //console.log("REQ.USER...", req.user);
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        /*
        We can put anything we want in req.session but returnTo
        is the url we want to redirect a user back to.
        */
        req.flash('error', 'You must be signed in!');
        return res.redirect('/login');
    }
    next();
}
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
/* Our path is... /campgrounds/id/reviews/reviewId */
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    // console.log("reviewId:", reviewId);
    const review = await Review.findById(reviewId);
    // console.log('REVIEWW');
    // console.log(review);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    //pass the entire body in to validate
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
    console.log('Done with validateReview');
}