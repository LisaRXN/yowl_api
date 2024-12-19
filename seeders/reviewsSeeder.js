const { faker } = require('@faker-js/faker');
const Reviews = require('../models/Reviews');

const seedReviews = async () => {
    for (let i = 0; i < 200; i++) {
        const rating = faker.number.int({ min: 0, max: 5 })
        const title = faker.lorem.sentence();
        const content = faker.lorem.sentence();
        const user_id = faker.number.int({ min: 1, max: 50 })
        const business_id = faker.number.int({ min: 1, max: 20 })
        const createdAt = faker.date.anytime() 
        await Reviews.create({ rating, title, content, user_id, business_id, createdAt});
    }

    console.log('100 reviews ajoutées.');  
};

module.exports = seedReviews;
