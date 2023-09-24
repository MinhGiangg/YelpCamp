const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);



// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

// const userSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     }
// });

// userSchema.plugin(passportLocalMongoose);
/*
We're passing in the results of requiring that package
to UserSchema.plugin. This is going to add on to our schema
a username, a field for password. It's going to make sure those
usernames are unique/not duplicated as well as give us some
additional methods that we can use.
*/
// module.exports = mongoose.model('User', userSchema);