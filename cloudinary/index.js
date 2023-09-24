const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
/*
We need to begin by setting the config on our cloudinary.
This is basically associating our account 
with this cloudinary instance.
Look at cloudinary package docs for more information.
*/

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});
/*We're going to instantiate an instance of cloudinary
storage (that we've required) in this file, we pass in
the cloudinary object (that we've just configured)
and then we've specify the folder IN CLOUDINARY that
we should store things in, we can also specify allowed
formats for the images */

module.exports = {
    cloudinary,
    storage
}