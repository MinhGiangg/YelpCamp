//CONTROLLERS
const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            //requires a callback!
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect('/campgrounds');
        }) 
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }   
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = async (req, res) => {
    /*Like how we implemented it in more detail last section,
    Authenticate is basically hashing our incoming password and 
    comparing it with the hashed password saved in our database
    to see if they're the same. */
    req.flash('success', 'Welcome Back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    // console.log("res.locals.returnTo", res.locals.returnTo);
    // console.log("redirectUrl", redirectUrl);
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}