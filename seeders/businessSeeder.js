const { faker } = require('@faker-js/faker');
const Business = require('../models/Business');

const seedBusinesses = async () => {


    for (let i = 0; i < 50; i++) {
        const name = faker.company.name();
        const description = faker.company.buzzPhrase();
        const web = faker.internet.url();
        const image = faker.image.url({ width: 200, height: 200 });
        const category_id = faker.number.int({ min: 1, max: 9 })
        await Business.create({ name, web, description, image, category_id});
    }

    console.log('50 entreprises ajoutées.');  
};

module.exports = seedBusinesses;
