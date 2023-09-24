/* 
We will run this file on its own, 
separate from our node app
whenever we want to seed our data base.
- Deletes everything from our database
- Fills it with 50 new campgrounds
*/

const mongoose = require('mongoose');
const Campground = require('../models/campground');
const axios = require('axios');

const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Mongo Connection Open!");
    })
    .catch((err) => {
        console.log("Oh no! Mongo connection error!");
        console.log(err);
    })

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

// async function seedImg() {
//     try {
//       const resp = await axios.get('https://api.unsplash.com/photos/random', {
//         params: {
//           client_id: '4FBC4vb8lPk6NY5CBuryTQcVrE812LAjZ8awxGWMq0Y',
//           collections: 1114848,
//         },
//       })
//       return resp.data.urls.small
//     } catch (err) {
//       console.error(err)
//     }
// }
  
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 150; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30);
        const camp = new Campground({
            author: '64e03e0d64f32d300e7eed00',
            location: `${cities[random1000].city} ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
            images: [
                {
                  url: 'https://res.cloudinary.com/ddvyxvglo/image/upload/v1693760571/YelpCamp/jucdxzumttjxcngxaeju.jpg',
                  filename: 'YelpCamp/jucdxzumttjxcngxaeju'
                },
                {
                  url: 'https://res.cloudinary.com/ddvyxvglo/image/upload/v1693760572/YelpCamp/kcba1dqphqqlgjprvxwt.jpg',
                  filename: 'YelpCamp/kcba1dqphqqlgjprvxwt'
                },
                {
                  url: 'https://res.cloudinary.com/ddvyxvglo/image/upload/v1693760573/YelpCamp/etgnsscnm2e5syb9fo68.jpg',
                  filename: 'YelpCamp/etgnsscnm2e5syb9fo68',
                }
              ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur necessitatibus nihil ut rem, vitae in placeat sunt cumque quia sed voluptatum accusantium, cupiditate a adipisci ipsam ad explicabo veritatis quasi.',
            price
        })
        await camp.save();
    }    
}
seedDB()
    .then(() => {
        mongoose.connection.close()
            .then(() => {
            console.log('Mongoose closed! Seeded database')
        })
})